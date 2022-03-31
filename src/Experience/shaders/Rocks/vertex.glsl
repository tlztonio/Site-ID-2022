uniform vec2 uResolution;
uniform vec3 uDebug;
uniform float uTime;

attribute vec3 barycentric;
attribute float even;

varying vec3 vPosition;
varying float vEven;
varying vec3 vBarycentric;

varying vec2 vUv;
varying float vElev;

#define OCTAVES   		2		// 7

vec2 hash( vec2 p ){
	p = vec2( dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
	return fract(sin(p)*43758.5453);
}
float voronoi( in vec2 x ){
	vec2 n = floor( x );
	vec2 f = fract( x );
	
	float F1 = 8.0;
	float F2 = 8.0;
	
	for( int j=-1; j<=1; j++ )
		for( int i=-1; i<=1; i++ ){
			vec2 g = vec2(i,j);
			vec2 o = hash( n + g );

			o = 0.5 + 0.41*sin( 6.2831*o );	
			vec2 r = g - f + o;

		float d =  dot(r,r);				// euclidean^2
		// float d = sqrt(dot(r,r));			// euclidean
		// float d = abs(r.x) + abs(r.y);		// manhattan
		// float d = max(abs(r.x), abs(r.y));	// chebyshev

		if( d<F1 ) { 
			F2 = F1; 
			F1 = d; 
		} else if( d<F2 ) {
			F2 = d;
		}
    }
	
	// float c = F1;
	// float c = F2;
	float c = F2-F1;
	// float c = (F1+F2)/2.0;
		
	c *= F1;
	// c = 1.0 - c;
    return c;
}
float fbm( in vec2 p ){
	float s = 0.0;
	float m = 0.0;
	float a = 0.5;
	
	for( int i=0; i<OCTAVES; i++ ){
		s += a * voronoi(p);
		m += a;
		a *= 0.5;
		p *= 2.0;
	}
	return s/m;
}
// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}
// 1D Random
float rand (in float st) {
    return fract(sin(dot(st,
                         12.9898))
                 * 43758.5453123);
}
// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // Smooth Interpolation
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
float noiseClamp(float nn){

	if(nn>uDebug.x && nn<uDebug.x+0.2){
		nn = 0.7 + rand(nn)*0.2;
	} else if(nn>uDebug.x+0.1){
		nn = 0.14 + rand(nn)*0.2;
	} else if(nn<uDebug.x){
		nn = 0.1 + rand(nn)*0.2;
	}
	return nn;
}

void main()
{
// PUT NORMAL NOISE WITH CLAMP ALGIRITHM TO ABOUT 3 STEPS ON X AND add small random amount to it than small random amount on yz 
// voronoi
	vec2 p = vec2(uv.x*10.0,uv.y);
   	float c = 5.0*fbm( 2.0*p );
//classic noise
    vec2 pos = vec2(uv.x*8.0,uv.y);
    float noisy = noiseClamp(c);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.x-=noisy*0.5;
    // modelPosition.x+=(modelPosition.y-0.5)*0.5;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

	vBarycentric = barycentric;
	vPosition = position;
  	vEven = even;
    vUv = uv;
    vElev = noisy/2.0;
}