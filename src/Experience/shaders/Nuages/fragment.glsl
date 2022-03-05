uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uDebug;

varying vec2 vUv;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


void main()
{
    // vec3 blue = vec3(0.32,0.64,0.83); original darker blue
    vec3 blue = vec3(0.0,0.74,1.0);
    vec3 whiteBlue = vec3(0.78,0.90,0.95);

    vec3 skyGradient = mix(blue,whiteBlue,vec3(-vUv.y*1.3+1.4));

    vec2 st = vec2(vUv.x*7.0-1.4,vUv.y);

    float pointSoleil = distance(st, vec2(3.0,0.5));

    float contourSoleil = smoothstep(0.01,0.03,pointSoleil);
    float contourLueur = sin(smoothstep(0.03,0.2,pointSoleil));

    vec3 soleil = vec3(1.0-contourSoleil);
    
    vec3 lueur = vec3(1.0-contourLueur)*0.1*vec3(1.0,1.0,0.0);

    vec2 pos = vec2(st.x*50.0, st.y*30.0);

    float noisy = max(noise(pos),0.05);

    gl_FragColor = vec4(skyGradient+soleil+lueur,1.0);
    // gl_FragColor += vec4(vec3(noisy),1.0);
}