uniform float uTime;

varying vec2 vUv;
varying vec4 vPos;

varying float vRandom;

void main()
{
    float elevation = vRandom*0.16;

    float r = smoothstep(0.0,0.8-vPos.y*0.2,0.39+elevation);
    float g = smoothstep(0.0,0.8-vPos.y*0.2,0.53+elevation);
    float b = smoothstep(0.0,0.8-vPos.y*0.2,0.6+elevation);

// AD SINUS ON Z TO MAKE WAVY PATTERN ECUME
    float ecume = max((vPos.x+15.0)-8.2+sin(uTime*0.0014)*0.2,0.0)*0.2;

    r += ecume;
    g += ecume;
    b += ecume;

    gl_FragColor = vec4(r,g,b, 1.0);
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