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
        value=0.0;
    }
    return value;
}

void main()
{
    float elevation = vRandom*0.16;

    float r = smoothstep(0.0,0.75-vPos.y*0.05,0.39+vRandom*0.1);
    float g = smoothstep(0.0,0.75-vPos.y*0.05,0.53+vRandom*0.1);
    float b = smoothstep(0.0,0.75-vPos.y*0.05,0.6+vRandom*0.1);

    // deformation for rounded beach
    float deformation1 = sin(vPos.z*0.75-4.0)*0.3;
    float deformation2 = cos(vPos.z*1.75-4.0)*0.1;
    float deformation3 = sin(vPos.z*0.50-4.0)*0.3;
    float tD = deformation1+deformation2+deformation3;

    // AD SINUS ON Z TO MAKE WAVY PATTERN ECUME
    // 7.5 = point de depart de la blancheur
    float ecume = max(vPos.x+3.85-tD-(sin(uTime*0.0014)*0.1) ,0.0)*0.2;

    r += ecume;
    g += ecume;
    b += ecume;

    vec2 st = -vUv.xy;

    // Scale the coordinate system to see some noise in action
    vec2 pos = vec2(st.x*55.0-sin(uTime*0.0014),st.y*100.0);

    float foamLines = 0.127;

    // clamp le noise pour avoir les contours
    float noisy = clampTest(foamLines-0.07,foamLines,noise(pos));
    // fait une parabole vers le haut pour rendre visible le noise que autour de la valeur centrale
    float segment = smoothstep(-4.0+tD,-2.75+tD,vPos.x)-smoothstep(-3.25+tD,-2.75+tD,vPos.x);
    // segmente le noise et augmente le pour le rendre plus blanc
    float finalFoam = noisy*segment*2.5;

    gl_FragColor = vec4(r+finalFoam,g+finalFoam,b+finalFoam, 1.0);
    //transparent not working check render
}