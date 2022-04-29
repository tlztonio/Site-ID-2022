uniform float uTime;
uniform vec3 uDebug;

varying float vRandom;
varying vec2 vUv;
varying vec4 vModelPosition;

#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main()
{
// original sand = 0.6, 0.46, 0.39
// curry sand = 0.84, 0.66, 0.42
// bright pink sand = 0.92, 0.78, 0.68
// bright yellow sand = 0.99, 0.88, 0.67
    float r = 0.80+max(vModelPosition.y+0.25,0.0)*vRandom*0.8;
    float g = 0.67+max(vModelPosition.y+0.25,0.0)*vRandom*0.8;
    float b = 0.5+max(vModelPosition.y+0.25,0.0)*vRandom*0.8;

    float wetLine = vModelPosition.y+sin(vModelPosition.z*7.0)*0.01;

    float wetSand = min(-0.20,wetLine)+0.20;

    r += wetSand;
    g += wetSand;
    b += wetSand;
    // r += wetSand*2.0*abs(sin(uTime*0.0003));
    // g += wetSand*2.0*abs(sin(uTime*0.0003));
    // b += wetSand*2.0*abs(sin(uTime*0.0003));


    // CHANGE THAT TO YOUR NEEDS
    vec3 finalColor = vec3(r, g, b);
    vec3 shadowColor = vec3(0, 0, 0);
    float shadowPower = 0.5;
    
    // declaration pour call directement le getshadow
    // DirectionalLightShadow directionalLight;
	// directionalLight = directionalLightShadows[ 0 ];
    // float finalShadow = getShadow( directionalShadowMap[ 0 ], directionalLight.shadowMapSize, 
    // directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ 0 ]);

    // vec4 stageShadow = texture2D(uStageShadow, newUv*2.0);

    gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), 1.0);
    // gl_FragColor += (vec4(stageShadow) - 1.0) * 0.35;
}