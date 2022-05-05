import { SimpleSurfaceData, SimpleSurfaceMesh } from './surface-data';
import { Peaks } from './math-func';
import { CreateSurfaceWithColormap } from './surface';
import $ from 'jquery';
import "./site.css";

const CreateSurface = async (colormapName: string, meshColor = [1,1,1], sampleCount=1, isAnimation = true) => {
    const data = SimpleSurfaceData(Peaks, -3, 3, -3, 3, 30, 30, 2, 0, colormapName);
    const mesh = SimpleSurfaceMesh(Peaks, -3, 3, -3, 3, 30, 30, 2, 0,[0,0,0], 0);
    await CreateSurfaceWithColormap(data?.vertexData!, data?.normalData!, data?.colorData!, mesh!, meshColor, {},sampleCount, isAnimation);
}

let isAnimation = true;
let colormapName = 'jet';
let meshColor = [0, 0, 0];
let sampleCount = 1;

CreateSurface(colormapName, meshColor, sampleCount, isAnimation);

$('#id-radio input:radio').on('click', function(){
    let val = $('input[name="options"]:checked').val();
    if(val === 'animation') isAnimation = true;
    else isAnimation = false;
    CreateSurface(colormapName, meshColor, sampleCount, isAnimation);
});

$('#btn-redraw').on('click', function(){
    meshColor = ($('#id-color').val()?.toString()!).split(',').map(Number);   
    sampleCount = parseInt($('#id-sample').val()?.toString()!);  
    CreateSurface(colormapName, meshColor, sampleCount, isAnimation);
});

$('#id-colormap').on('change',function(){
    const ele = this as any;
    colormapName = ele.options[ele.selectedIndex].text;
    CreateSurface(colormapName, meshColor, sampleCount, isAnimation);
});

window.addEventListener('resize', function() {
    CreateSurface(colormapName, meshColor, sampleCount, isAnimation);
});