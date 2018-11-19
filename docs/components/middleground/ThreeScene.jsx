import React from 'react';
import * as THREE from 'three';

class ThreeScene extends React.Component{
    constructor(props){
        super(props);

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.mouseX = 0;
        this.mouseY = 0;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    }
    
    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        // let canvas = document.getElementsByTagName("canvas")[0]
        debugger;
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1800;

        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(0, 0, 1);
        this.scene.add(this.light);

        // let canvas = this.renderer.domElement;
        // console.log(canvas);
        // var context = canvas.getContext('2d');
        // console.log(canvas.getContext('2d'));

        // var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        // gradient.addColorStop(0.1, 'rgba(210,210,210,1)');
        // gradient.addColorStop(1, 'rgba(255,255,255,1)');
        // context.fillStyle = gradient;
        // context.fillRect(0, 0, canvas.width, canvas.height);
        // var shadowTexture = new THREE.CanvasTexture(canvas);
        // var shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture });
        // var shadowGeo = new THREE.PlaneBufferGeometry(300, 300, 1, 1);
        // var shadowMesh;
        // shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
        // shadowMesh.position.y = - 250;
        // shadowMesh.rotation.x = - Math.PI / 2;
        // this.scene.add(shadowMesh);

        // shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
        // shadowMesh.position.y = - 250;
        // shadowMesh.position.x = - 400;
        // shadowMesh.rotation.x = - Math.PI / 2;
        // this.scene.add(shadowMesh);
        // shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
        // shadowMesh.position.y = - 250;
        // shadowMesh.position.x = 400;
        // shadowMesh.rotation.x = - Math.PI / 2;
        // this.scene.add(shadowMesh);


        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setClearColor('#000000', 0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(width, height);

        this.mount.appendChild(this.renderer.domElement)

        //ADD GEOMETRY
        var radius = 200;
        var geometry1 = new THREE.IcosahedronBufferGeometry(radius, 1);
        var count = geometry1.attributes.position.count;
        geometry1.addAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
        var color = new THREE.Color();
        var positions1 = geometry1.attributes.position;
        var colors1 = geometry1.attributes.color;

        for (var i = 0; i < count; i++) {
            // color.setHSL((positions1.getY(i) / radius + 1) / 2, 1.0, 0.5);
            color.setRGB(1, 0.8 - (positions1.getY(i) / radius + 1) / 2, 0);
            colors1.setXYZ(i, color.r, color.g, color.b);
        }
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true,
            vertexColors: THREE.VertexColors,
            shininess: 0
        });
        var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true });
        var mesh = new THREE.Mesh(geometry1, material);
        var wireframe = new THREE.Mesh(geometry1, wireframeMaterial);
        mesh.add(wireframe);
        mesh.position.x = 0;
        mesh.rotation.x = - 1.87;
        this.scene.add(mesh);

        // const geometry = new THREE.BoxGeometry(1, 1, 1)
        // const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
        // this.cube = new THREE.Mesh(geometry, material)
        // this.scene.add(this.cube)
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        window.addEventListener('resize', this.onWindowResize, false);
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;        

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onDocumentMouseMove(e) {
        this.mouseX = (e.clientX - this.windowHalfX);
        this.mouseY = (e.clientY - this.windowHalfY);
    }

    start(){
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop (){
        cancelAnimationFrame(this.frameId)
    }

    animate () {
        // this.cube.rotation.x += 0.01
        // this.cube.rotation.y += 0.01
        

        // console.log(this.camera.position);
        

        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene () {
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
        this.camera.position.y += (- this.mouseY - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div 
                style={{ width: '100%', height: '100%' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default ThreeScene;