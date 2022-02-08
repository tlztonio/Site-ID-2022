uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uDebug;


varying float vRandom;
varying vec2 vUv;
varying vec4 vPos;
varying vec4 vGlPos;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// float noise (in vec2 st) {
//     vec2 i = floor(st);
//     vec2 f = fract(st);

//     // Four corners in 2D of a tile
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));

//     // Smooth Interpolation

//     // Cubic Hermine Curve.  Same as SmoothStep()
//     vec2 u = f*f*(3.0-2.0*f);
//     // u = smoothstep(0.,1.,f);

//     // Mix 4 coorners percentages
//     return mix(a, b, u.x) +
//             (c - a)* u.y * (1.0 - u.x) +
//             (d - b) * u.x * u.y;
// }

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float clampTest(float mi, float ma, float value){
    if(value<mi){
        value=0.0;
    } else if(value>ma){
        value= 0.0;
    }
    return value;
}

void main()
{
    float elevation = vRandom*0.16;

    float r = smoothstep(0.0,0.75-vPos.y*0.05,0.39+vRandom*0.1);
    float g = smoothstep(0.0,0.75-vPos.y*0.05,0.53+vRandom*0.1);
    float b = smoothstep(0.0,0.75-vPos.y*0.05,0.6+vRandom*0.1);

    // AD SINUS ON Z TO MAKE WAVY PATTERN ECUME
    // 7.5 = point de depart de la blancheur
    float ecume = max(vPos.x+4.25-(sin(uTime*0.0014)*0.2) ,0.0)*0.2;

    r += ecume;
    g += ecume;
    b += ecume;

    vec2 st = -vUv.xy;

    // Scale the coordinate system to see some noise in action
    vec2 pos = vec2(st.x*40.0-sin(uTime*0.0014),st.y*70.0);

    float foamLines = 0.127;

    // clamp le noise pour avoir les contours
    float noisy = clampTest(foamLines-0.07,foamLines,noise(pos));
    // fait une parabole vers le haut pour rendre visible le noise que autour de la valeur centrale
    float segment = smoothstep(-4.3,-3.0,vPos.x)-smoothstep(-3.5,-3.0,vPos.x);
    // segmente le noise et augmente le pour le rendre plus blanc
    float finalFoam = noisy*segment*2.5;

    gl_FragColor = vec4(r+finalFoam,g+finalFoam,b+finalFoam, 1.0);
    //transparent not working check render
}

// // Author: @patriciogv
// // Title: 4 cells DF

// #ifdef GL_ES
// precision mediump float;
// #endif

// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// uniform float u_time;

// void main() {
//     vec2 st = gl_FragCoord.xy/u_resolution.xy;
//     st.x *= u_resolution.x/u_resolution.y;

//     vec3 color = vec3(.0);

//     // Cell positions
//     vec2 point[5];
//     point[0] = vec2(0.83,0.75);
//     point[1] = vec2(0.60,0.07);
//     point[2] = vec2(0.28,0.64);
//     point[3] =  vec2(0.31,0.26);
//     point[4] = u_mouse/u_resolution;

//     float m_dist = 1.0;  // minimum distance

//     // Iterate through the points positions
//     for (int i = 0; i < 5; i++) {
//         float dist = distance(st, point[i]);

//         // Keep the closer distance
//         m_dist = min(m_dist, dist);
//     }

//     // Draw the min distance (distance field)
//     color += m_dist;
//     float r=0.38;
//     float g=0.53;
//     float b=0.6;

//     // Show isolines
//     // color -= step(.7,abs(sin(50.0*m_dist)))*.3;

//     gl_FragColor = vec4(color.x+r,color.y+g,color.z+b,1.0);
// }