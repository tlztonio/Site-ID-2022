uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uDebug;

varying vec2 vUv;


void main()
{
    vec3 blue = vec3(0.54,0.63,0.67);
    vec3 yellow = vec3(1.0,0.59,0.33);
    // yellow*=vUv.x*10.0;
    // yellow*=vUv.y*10.0;

    vec2 st = vUv.xy;
    float pct = 0.0;

    pct = distance(st,vec2(0.5));

    vec3 color = vec3(1.0)-vec3(pct);

    gl_FragColor = vec4(mix(yellow, blue,pct*5.0), 0.5);
}