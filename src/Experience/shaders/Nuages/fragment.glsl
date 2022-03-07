#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uDebug;

uniform float uRandomFbm;

varying vec2 vUv;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

float clampDown ( float value, float mi){
    if(value<mi){
        value=0.0;
    }
    return value;
}

vec3 cloudMaker (float posX,float posY, float sizeX, float sizeY, vec2 stC){
    // position x, position y, taille X, taille Y
    posX +=uTime*0.00004;

    float tourComplet = 7.0*(10.0-sizeX);

    if(posX>tourComplet){
        posX-=tourComplet * floor(posX/tourComplet);
    }

    vec2 stN = vec2(stC.x*(10.0-sizeX),stC.y*(10.0-sizeY));
    float pointN = distance(stN, vec2(posX,posY));
    float contourN = smoothstep(0.0,0.7,pointN);
    float flatBottom = clamp( (stN.y-posY+0.33) * 2.0, 0.0, 1.0);
    float finalN = clampDown( fbm(vec2(stC.x * 30.0 - uTime*0.0002 + uRandomFbm, stC.y * 30.0)) * (1.0-contourN),0.3) * 0.8 * flatBottom;
    finalN = smoothstep(0.0, 0.7, finalN);

    return vec3(finalN,finalN*0.3,finalN);
}

void main()
{
    vec3 blue = vec3(0.0,0.74,1.0);
    vec3 whiteBlue = vec3(0.78,0.90,0.95);

    vec2 st = vec2(vUv.x*7.0,vUv.y);

    vec3 skyGradient = mix(blue,whiteBlue,vec3(-vUv.y*1.3+1.4));

    // vec2 stNuage = vec2(st.x*2.5,st.y*8.0);
    // float pointNuage = distance(stNuage, vec2(2.0+uTime*0.00003,5.5));
    // float contourNuage = smoothstep(0.0,uDebug.x,pointNuage);
    // float finalNuage = clampDown( fbm(vec2(st.x * 30.0 - uTime*0.0002, st.y * 30.0)) * (1.0-contourNuage),uDebug.y) * 0.8;
    // skyGradient += vec3(finalNuage,finalNuage*0.3,finalNuage);

    // minX 2, maxX 19, minY 4.0, maxY 6.0
    // three for first plan
    skyGradient += cloudMaker(4.5, 4.2, 7.0, 1.5,st);
    skyGradient += cloudMaker(5.5, 5.0, 7.3, 2.7,st);
    skyGradient += cloudMaker(10.0, 4.0, 6.5, 3.0,st);
    // after the scene/ close to it
    skyGradient += cloudMaker(19.0, 4.0, 5.0, 0.5,st);
    skyGradient += cloudMaker(13.0, 4.0, 7.0, 2.0,st);
    skyGradient += cloudMaker(17.0, 4.0, 6.5, 3.0,st);
    skyGradient += cloudMaker(24.0, 3.0, 5.5, 0.5,st);
    skyGradient += cloudMaker(26.0, 3.5, 5.7, 2.5,st);
    skyGradient += cloudMaker(20.0, 3.7, 7.0, 3.0,st);
    skyGradient += cloudMaker(2.5, 4.3, 6.0, 2.0,st);


    float pointSoleil = distance(vec2(st.x-1.4,st.y), vec2(3.0,0.5));

    float contourSoleil = smoothstep(0.01,0.03,pointSoleil);
    float contourLueur = sin(smoothstep(0.03,0.2,pointSoleil));

    vec3 soleil = vec3(1.0-contourSoleil);
    
    vec3 lueur = vec3(1.0-contourLueur)*0.1*vec3(1.0,1.0,0.0);

    gl_FragColor = vec4(skyGradient+soleil+lueur,1.0);
}