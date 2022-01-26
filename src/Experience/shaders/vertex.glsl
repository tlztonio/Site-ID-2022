uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vRandom;

attribute float aRandom;

#include <fog_pars_vertex>

void main()
{
    #include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>

    float newX = position.x*cos(-50.0) - position.z*sin(-50.0);
    // float newZ = position.z*cos(45.0) + position.x*sin(45.0);

    // vec4 modelPosition = modelMatrix * vec4(vec3(newX,position.y,position.z), 1.0);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.z += aRandom*0.02;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vRandom = aRandom /4.0 ;

}