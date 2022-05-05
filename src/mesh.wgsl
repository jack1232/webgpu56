// vertex shader
struct Uniforms {
    viewProjectionMatrix : mat4x4<f32>,
    modelMatrix : mat4x4<f32>,
};
@binding(0) @group(0) var<uniform> uniforms : Uniforms;
@stage(vertex)
fn vs_main(@location(0) position : vec4<f32>) ->  @builtin(position) vec4<f32> {
    return uniforms.viewProjectionMatrix*uniforms.modelMatrix * position;                
}

// fragment shader
struct FragUniforms {
    color: vec3<f32>,
};
@binding(0) @group(1) var<uniform> fragUniforms : FragUniforms;

@stage(fragment)
fn fs_main() -> @location(0) vec4<f32> {
    return vec4<f32>(fragUniforms.color, 1.0);
}