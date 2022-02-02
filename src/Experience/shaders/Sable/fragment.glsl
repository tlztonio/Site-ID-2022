varying vec2 vUv;
varying float vRandom;
varying vec4 vModelPosition;

#include <fog_pars_fragment>

void main()
{

    float r = 0.6+max(vModelPosition.y+0.25,0.0)*vRandom/1.85;
    float g = 0.46+max(vModelPosition.y+0.25,0.0)*vRandom/1.85;
    float b = 0.39+max(vModelPosition.y+0.25,0.0)*vRandom/1.85;

    gl_FragColor = vec4(r,g,b, 1.0);
    #include <fog_fragment>
}