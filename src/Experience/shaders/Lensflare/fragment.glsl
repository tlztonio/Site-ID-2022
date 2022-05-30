uniform sampler2D tDiffuse;

uniform sampler2D tLensFlare1;

uniform vec2 uSunCoords;
uniform vec2 uResolution;

uniform float uAspectRatio;
uniform float uTime;

varying vec2 vUv;

vec2 calcFlaresPos(float spacing, float index, vec2 sunToC)
{

    vec2 direction = sunToC;
    vec2 pos = direction * vec2(index * spacing);
    pos += uSunCoords;

    return pos;

}

float circle(vec2 uv, vec2 pos, float radius, float blur)
{
    float value = 1.0 - clamp( distance(uv, pos) * radius, blur, 1.0);

    return value;
}


void main()
{
    // for the positions I use a scale were y = 1 and x = 1.something to modify the uvs and make circular shapes on any res

    // TODO:
    // rayons soleils deviennent plus intenses avec une distance plus courte 
    // circle line, hexagon ?, color change in the reds, chevauching cercles, diff sizes
    // maybe blur on top of it all
    // rgb shift
    // small random rays

	vec4 color = texture2D(tDiffuse, vUv); // classic uv

    vec2 newvUv = vec2(vUv.x * uAspectRatio, vUv.y);
    vec2 center = vec2(0.5 * uAspectRatio, 0.5);
    vec2 sunToCenter = vec2(center - uSunCoords);

    float flareLength = distance(center, uSunCoords)*2.0;
    float spacing = flareLength * 0.25;
    float brightness = (1.0 - (flareLength * 0.4));

    vec2 flarePos1 = calcFlaresPos(spacing, 1.0, sunToCenter);
    vec2 flarePos2 = calcFlaresPos(spacing, 1.8, sunToCenter);
    vec2 flarePos3 = calcFlaresPos(spacing, 2.25, sunToCenter);
    vec2 flarePos4 = calcFlaresPos(spacing, 3.5, sunToCenter);
    vec2 flarePos5 = calcFlaresPos(spacing, 4.35, sunToCenter);

    vec4 sunImage = smoothstep(0.0, 0.7, texture2D(tLensFlare1, (newvUv-uSunCoords+0.12)*4.0)) * 0.75;

    // distance * size, whiteness clamp
    float flare1 = circle(newvUv, flarePos1, 20.0, 0.9);
    float flare2 = circle(newvUv, flarePos2, 45.0, 0.9);
    float flare3 = circle(newvUv, flarePos3, 20.0, 0.2) * 0.3;
    float flare4 = clamp(circle(newvUv, flarePos4, 10.0, 0.9) - circle(newvUv, flarePos4, 10.05, 0.9), 0.0, 1.0) * 5.0;
    float flare5 = circle(newvUv, flarePos5, 20.0, 0.9);

    vec4 flares = vec4(flare1 + flare2 + flare3 + flare4 + flare5) * max( 0.85-flareLength*0.5, 0.0);
    vec4 orangeFilter = vec4(0.16, 0.08, 0.02, 0.0) * 0.75;

    gl_FragColor = color + flares + orangeFilter + sunImage;
}