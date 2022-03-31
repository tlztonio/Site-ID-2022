uniform vec2 uResolution;
uniform float uTime;
uniform float PI;

varying vec2 vUv;
varying float vElev;


void main()
{

    gl_FragColor = vec4(vElev,vElev,vElev,1.0);

}