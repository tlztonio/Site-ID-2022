uniform float uTime;
uniform float PI;
uniform vec2 uDebug;

uniform vec4 waveA;
uniform vec4 waveB;
uniform vec4 waveC;

varying vec2 vUv;
varying float vRandom;
varying vec4 vPos;

attribute float aRandom;

// vec3 GerstnerWave (vec4 wave, vec3 p) {
//     float steepness = wave.z;
//     float wavelength = wave.w;
//     float k = 2.0 * PI / wavelength;
//     float c = sqrt(9.8 / k);
//     vec2 d = normalize(wave.xy);
//     float f = k * (dot(d, p.xy) - c * uTime/750.0);
//     float a = steepness / k;
//     return vec3(
//         d.x * (a * cos(f)),
//         d.y * (a * cos(f)),
//         a * sin(f)
//     );
// }

void main()
{
    float slowedTime = uTime*0.0014;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //CHANGE LES DIVISER PAR DES FOIS
    float horizon = max((modelPosition.x+7.0)*0.2,0.0);

    modelPosition.y += sin(modelPosition.x*1.5 + slowedTime)*0.025*horizon;
    modelPosition.y += sin(modelPosition.z*5.0 + slowedTime)*0.013*horizon;
    modelPosition.y += cos(modelPosition.z*7.0 + slowedTime)*0.013*horizon;
    modelPosition.y += aRandom*0.1*min((modelPosition.x+3.0)*0.1,0.0);

    // deformation for rounded beach
    // float deformation1 = sin(modelPosition.z*0.75-4.0)*0.3;
    // float deformation2 = cos(modelPosition.z*1.75-4.0)*0.2;
    // float deformation3 = sin(modelPosition.z*0.50-4.0)*0.3;
    // modelPosition.x += deformation1+deformation2+deformation3;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    
    vRandom = aRandom*0.25;
    vUv = uv;
    vPos = modelPosition;
}