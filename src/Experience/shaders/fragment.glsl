varying vec2 vUv;
varying float vRandom;

#include <fog_pars_fragment>

void main()
{
    gl_FragColor = vec4(0.6+vRandom/4.0, 0.46+vRandom/4.0, 0.39+vRandom/4.0, 1.0);
    #include <fog_fragment>
}