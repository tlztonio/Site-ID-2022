uniform vec2 uDebug;
uniform float uTime;

varying vec2 vUv;
varying float vRandom;
varying float vDef;
varying vec4 vModelPosition;
varying vec4 vModelPositionInit;
varying vec3 vInitCoord;


attribute float aRandom;

#include <common>
#include <shadowmap_pars_vertex>
#include <lights_pars_begin>

void main()
{
#include <begin_vertex>
    #include <project_vertex>
    #include <worldpos_vertex>
    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = normalMatrix * objectNormal;
    #include <shadowmap_vertex>

    // float pi = 3.14159265359;
    // float rotationValue = -pi*0.5;
    // float newY = position.y*cos(rotationValue) - position.z*sin(rotationValue);
    // float newZ = position.z*cos(rotationValue) + position.y*sin(rotationValue);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vModelPositionInit = modelPosition;

    // Smooth interpolation between these values, -1 to re-adjust and 0.5 to attenuate the hill
    modelPosition.y += (smoothstep(-2.85,-0.85,modelPosition.x)-1.0)*0.4;

    // deformation for rounded beach
    float deformation1 = sin(modelPosition.z*0.75-4.0)*0.3;
    float deformation2 = cos(modelPosition.z*1.75-4.0)*0.2;
    float deformation3 = sin(modelPosition.z*0.50-4.0)*0.3;
    modelPosition.x += deformation1+deformation2+deformation3;
    vDef = deformation1+deformation2+deformation3;

    // modelPosition.y += (aRandom*0.02) * (0.5-modelPosition.y)* 10.0;
    modelPosition.y += max(modelPosition.y+0.25,0.0)*aRandom*0.1;
    // modelPosition.y += min(modelPosition.y+0.25,0.0)*sin(modelPosition.z*5.0)*0.5;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vInitCoord = position;

    gl_Position = projectedPosition;

    vUv = uv;
    vRandom = aRandom /4.0;
    vModelPosition = modelPosition;

}