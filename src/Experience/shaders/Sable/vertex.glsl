uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vRandom;
varying vec4 vModelPosition;

attribute float aRandom;

#include <fog_pars_vertex>

void main()
{
    #include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>

    // float pi = 3.14159265359;
    // float rotationValue = -pi*0.5;
    // float newY = position.y*cos(rotationValue) - position.z*sin(rotationValue);
    // float newZ = position.z*cos(rotationValue) + position.y*sin(rotationValue);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Smooth interpolation between these values, -1 to re-adjust and 0.5 to attenuate the hill
    modelPosition.y += (smoothstep(-6.0,-3.0,modelPosition.x)-1.0)*0.5;

    // CHANGE SMOOTHNESS TO GET LISSE BEGINING OF BEACH

    // modelPosition.y += (aRandom*0.02) * (0.5-modelPosition.y)* 10.0;
    modelPosition.y += max(modelPosition.y+0.25,0.0)*aRandom*0.1;
    // modelPosition.y += min(modelPosition.y+0.25,0.0)*sin(modelPosition.z*5.0)*0.5;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vRandom = aRandom /4.0;
    vModelPosition = modelPosition;
}