import {
    Engine,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial, Texture,
    Vector3,
} from "@babylonjs/core";
import '@babylonjs/loaders';

export default {
    data() {
        return {
            engine: null,
            scene: null,
            light: null,
            camera: null,
            ground: null,
            gun: null,
        };
    },
    methods: {
        initGame(canvas) {
            //Setup game environment
            this.createEngine(canvas);
            this.createScene();
            this.createLight();
            this.createCamera();

            // //Create game meshes
            this.createGround();
            this.createGun();

            //Start game render
            this.renderGame();
        },

        //Environment
        createEngine(canvas) {
            this.engine = new Engine(canvas, true);
        },
        createScene() {
            this.scene = new Scene(this.engine);
            this.initSceneGravity();
        },
        createLight() {
            this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
        },
        createCamera() {
            this.camera = new FreeCamera('camera', new Vector3(0, 2, 0), this.scene);
            this.camera.attachControl();
            this.camera.checkCollisions = true;
            this.camera.applyGravity = true;
            this.camera.ellipsoid = new Vector3(1, 1, 1);
            this.camera.minZ = 0.01;
            this.camera.speed = 0.9;
            this.camera.inertia = 0.5;
            this.camera.angularSensibility = 600;
            this.initFPSControl();
            this.setWASDControlAsDefault();
            this.renderReticle();
        },

        //Meshes
        createGround() {
            this.ground = MeshBuilder.CreateGround('ground', {width: 100, height: 100}, this.scene);
            this.ground.checkCollisions = true;

            const groundMaterial = new StandardMaterial('ground_material', this.scene),
                materialScale = 20;
            groundMaterial.diffuseTexture = new Texture(require('@/assets/textures/grass.png'));
            this.ground.material = groundMaterial;
            this.ground.material.diffuseTexture.uScale = materialScale;
            this.ground.material.diffuseTexture.vScale = materialScale;
        },
        createGun() {
            this.gun = MeshBuilder.CreateBox('gun', {width: 0.05, height: 0.05}, this.scene);
            this.gun.rotation = new Vector3(0, 0, 0);
            this.gun.position.x = 0.3;
            this.gun.position.z = 0.7;
            this.gun.position.y = -0.2;
            this.gun.parent = this.camera;
        },

        //Render Game
        renderGame() {
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        },

        //Helper
        initSceneGravity() {
            const fps = 60,
                gravity = -9.81;
            this.scene.gravity = new Vector3(0, gravity / fps, 0);
            this.scene.collisionsEnabled = true;
        },
        initFPSControl() {
            this.scene.onPointerDown = (event) => {
                if (event.button === 0) {
                    this.engine.enterPointerlock();
                }
                if (event.button === 1) {
                    this.engine.exitPointerlock();
                }
            };
        },
        setWASDControlAsDefault() {
            this.camera.keysUp.push(87); //W
            this.camera.keysLeft.push(65); //A
            this.camera.keysDown.push(83); //S
            this.camera.keysRight.push(68); //D
        },
        renderReticle() {
            let reticleX = document.createElement('div'),
                reticleY = document.createElement('div'),
                styleX = reticleX.style,
                styleY = reticleY.style;

            styleX.position = 'absolute';
            styleX.top = '50%';
            styleX.left = '50%';
            styleX.margin = '-1px 0 0 -15px';
            styleX.width = '30px';
            styleX.height = '2px';
            styleX.backgroundColor = 'red';

            styleY.position = 'absolute';
            styleY.top = '50%';
            styleY.left = '50%';
            styleY.margin = '-15px 0 0 -1px';
            styleY.width = '2px';
            styleY.height = '30px';
            styleY.backgroundColor = 'red';

            document.body.appendChild(reticleX);
            document.body.appendChild(reticleY);
        },
    },
}