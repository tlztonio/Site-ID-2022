uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

// void main()
// {
//     // vec2 modifUv = mix(vec2(0.0),vec2(1.0),vUv*2.0-0.5);
//     // modifUv -= modifUv*0.5;
//     vec4 color = texture2D(tDiffuse, vUv)+abs(sin( (vUv.x-0.5) * 25.0 * (vUv.y+1.0) ))*0.01;
    
//     // vec4 colorRays = texture2D(tDiffuse, modifUv);
//     // colorRays.rgb *= 0.1;
//     gl_FragColor = color;
// }

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed)
{
	vec2 sourceToCoord = coord - raySource;
	float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
	
	return clamp(
		(0.45 + 0.15 * sin(cosAngle * seedA + uTime*0.001 * speed)) +
		(0.3 + 0.2 * cos(-cosAngle * seedB + uTime*0.001 * speed)),
		0.0, 1.0) *
		clamp((uResolution.x - length(sourceToCoord)) / uResolution.x, 0.5, 1.0);
}

void main()
{
	vec2 uv = gl_FragCoord.xy / uResolution.xy;
	uv.y = 1.0 - uv.y;
	vec2 coord = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
	
	
	// Set the parameters of the sun rays
	vec2 rayPos1 = vec2(uResolution.x * 0.7, uResolution.y * -0.4);
	vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
	float raySeedA1 = 36.2214;
	float raySeedB1 = 21.11349;
	float raySpeed1 = 1.5;
	
	vec2 rayPos2 = vec2(uResolution.x * 0.8, uResolution.y * -0.6);
	vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
	float raySeedA2 = 22.39910;
	float raySeedB2 = 18.0234;
	float raySpeed2 = 1.1;
	
	// Calculate the colour of the sun rays on the current fragment
	vec4 rays1 =vec4(1.0, 1.0, 1.0, 1.0) * rayStrength(rayPos1, rayRefDir1, coord, raySeedA1, raySeedB1, raySpeed1);
	 
	vec4 rays2 =vec4(1.0, 1.0, 1.0, 1.0) * rayStrength(rayPos2, rayRefDir2, coord, raySeedA2, raySeedB2, raySpeed2);
	
	vec4 color = rays1 * 0.5 + rays2 * 0.4;
	
	// Attenuate brightness towards the bottom, simulating light-loss due to depth.
	// Give the whole thing a blue-green tinge as well.
	float brightness = 1.0 - (coord.y / uResolution.y);
	color.x *= 0.1 + (brightness * 0.8);
	color.y *= 0.3 + (brightness * 0.6);
	color.z *= 0.5 + (brightness * 0.5);
    vec4 colorRays = texture2D(tDiffuse,vUv);
    gl_FragColor = colorRays + color;
}