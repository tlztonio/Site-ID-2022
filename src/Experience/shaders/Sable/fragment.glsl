uniform float uTime;

varying float vRandom;
varying vec2 vUv;
varying vec4 vModelPosition;

#include <common>
#include <packing>
// #include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
// #include <dithering_pars_fragment>

void main()
{

    float r = 0.6+max(vModelPosition.y+0.25,0.0)*vRandom/1.85;
    float g = 0.46+max(vModelPosition.y+0.25,0.0)*vRandom/1.85;
    float b = 0.39+max(vModelPosition.y+0.25,0.0)*vRandom/1.85;

    float wetLine = vModelPosition.y+sin(vModelPosition.z*7.0)*0.01;

    float wetSand = min(-0.20,wetLine)+0.20;

    r += wetSand;
    g += wetSand;
    b += wetSand;
    // r += wetSand*2.0*abs(sin(uTime*0.0003));
    // g += wetSand*2.0*abs(sin(uTime*0.0003));
    // b += wetSand*2.0*abs(sin(uTime*0.0003));

    // gl_FragColor = vec4(r,g,b, 1.0);
    // #include <fog_fragment>


    // CHANGE THAT TO YOUR NEEDS
    vec3 finalColor = vec3(r, g, b);
    vec3 shadowColor = vec3(0, 0, 0);
    float shadowPower = 1.0;
    
    // it just mixes the shadow color with the frag color
    gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), 1.0);
    // #include <fog_fragment>
    // #include <dithering_fragment>
    //  #include <shadowmap_fragment>
}