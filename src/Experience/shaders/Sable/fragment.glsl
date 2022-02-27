uniform float uTime;
uniform vec2 uDebug;

varying float vRandom;
varying float vDef;
varying vec2 vUv;
varying vec4 vModelPosition;
varying vec4 vModelPositionInit;
varying vec3 vInitCoord;


#include <common>
#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

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


    // CHANGE THAT TO YOUR NEEDS
    vec3 finalColor = vec3(r, g, b);
    vec3 shadowColor = vec3(0, 0, 0);
    float shadowPower = 0.5;
    
    // declaration pour call directement le getshadow
    DirectionalLightShadow directionalLight;
	directionalLight = directionalLightShadows[ 0 ];

        // deformation for rounded beach
    float deformation1 = sin(vModelPositionInit.z*0.75-4.0)*0.3;
    float deformation2 = cos(vModelPositionInit.z*1.75-4.0)*0.2;
    float deformation3 = sin(vModelPositionInit.z*0.50-4.0)*0.3;
    float totalDeformation = deformation1+deformation2+deformation3;

    vec4 deformedShadowCoord = vDirectionalShadowCoord[ 0 ];
    // vec4 deformedShadowCoord = vec4(vInitCoord,1.0);
    // deformedShadowCoord.yz+=1.0 *uDebug.x; 
    // yz c up and down a peu pres
    // deformedShadowCoord=vec4(vDirectionalShadowCoord[ 0 ].x,vDirectionalShadowCoord[ 0 ].y,1.0,1.0);

    float finalShadow = getShadow( directionalShadowMap[ 0 ], directionalLight.shadowMapSize, 
    directionalLight.shadowBias, directionalLight.shadowRadius, deformedShadowCoord);

    gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - 
    finalShadow ) * shadowPower), 1.0);
    // gl_FragColor = deformedShadowCoord;

    //deform coordinates a la main 
}