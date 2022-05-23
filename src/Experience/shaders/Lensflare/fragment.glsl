uniform sampler2D tDiffuse;

// uniform sampler2D tLensFlare1;
// uniform sampler2D tLensFlare2;
// uniform sampler2D tLensFlare3;

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


void main()
{
    // for the positions I use a scale were y = 1 and x = 1.something to modify the uvs and make circular shapes on any res

    // TODO:
    // rayons soleil image 
    // rayons soleils deviennent plus intenses avec une distance plus courte 
    // rgb shift
    // small random rays

	vec4 color = texture2D(tDiffuse, vUv); // classic uv

    vec2 newvUv = vec2(vUv.x * uAspectRatio, vUv.y);
    vec2 center = vec2(0.5 * uAspectRatio, 0.5);
    vec2 sunToCenter = vec2(center - uSunCoords);

    float flareLength = distance(center, uSunCoords)*2.0;
    float spacing = flareLength * 0.25;
    float brightness = (1.0 - (flareLength * 0.4));

    vec2 flarePos1 = calcFlaresPos(spacing, 0.5, sunToCenter);
    vec2 flarePos2 = calcFlaresPos(spacing, 1.4, sunToCenter);
    vec2 flarePos3 = calcFlaresPos(spacing, 2.25, sunToCenter);
    // vec2 flarePos4 = calcFlaresPos(spacing, 4.0, sunToCenter);

    // vec4 flare1 = texture2D(tLensFlare1, flarePos1);

    // distance * size, whiteness clamp
    float flare1 = 1.0 - clamp( distance(newvUv, flarePos1) * 35.0, 0.9, 1.0);
    float flare2 = 1.0 - clamp( distance(newvUv, flarePos2) * 30.0, 0.9, 1.0);
    float flare3 = 1.0 - clamp( distance(newvUv, flarePos3) * 20.0, 0.9, 1.0);
    // float flare4 = 1.0 - clamp( distance(newvUv, flarePos4) * 20.0, 0.9, 1.0);

    vec4 flares = vec4(flare1 + flare2 + flare3) * max( 0.4-flareLength*0.2, 0.0);

    gl_FragColor = color + flares;
}