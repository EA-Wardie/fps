import {
    Engine,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    Scene,
    SceneLoader,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";
import '@babylonjs/loaders';
import {GrassProceduralTexture} from '@babylonjs/procedural-textures';
import InGameUI from "@/framework/InGameUI";

export default {
    mixins: [InGameUI],
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

            //UI
            this.handleUI();

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
            this.camera = new FreeCamera('camera', new Vector3(0, 4, 0), this.scene);
            this.addFPSControl();
            this.addWASDControl();
            this.addHealth();
            this.addSprint();
            this.addLean();
        },

        //Meshes
        createGround() {
            this.ground = MeshBuilder.CreateGround('ground', {width: 100, height: 100}, this.scene);
            this.ground.checkCollisions = true;

            const grassMaterial = new StandardMaterial('grass_material', this.scene);
            grassMaterial.ambientTexture = new GrassProceduralTexture('grass_texture', 512, this.scene);
            this.ground.material = grassMaterial;
        },
        createGun() {
            SceneLoader.ImportMesh('', './assets/models/', 'shotgun.glb', this.scene, (meshes) => {
                this.gun = meshes[0];
                this.gun.scaling = new Vector3(0.1, 0.1, 0.1);
                this.gun.rotation = new Vector3(0, -1.7, 0.04);
                this.gun.position.x = 0.15;
                this.gun.position.z = 0.2;
                this.gun.position.y = -0.1;
                this.gun.parent = this.camera;
                this.addAmmo();
            });
        },

        //UI
        handleUI() {
            this.drawReticle();
            this.drawHealthBar();
            this.drawStaminaBar();
            this.drawAmmoCount();
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
        addFPSControl() {
            this.camera.attachControl();
            this.camera.checkCollisions = true;
            this.camera.applyGravity = true;
            this.camera.ellipsoid = new Vector3(1, 2, 1);
            this.camera.minZ = 0.01;
            this.camera.speed = 2;
            this.camera.inertia = 0.5;
            this.camera.angularSensibility = 350;

            this.scene.onPointerDown = (event) => {
                if (event.button === 0) {
                    this.engine.enterPointerlock();
                }
                if (event.button === 1) {
                    this.engine.exitPointerlock();
                }
            };
        },
        addWASDControl() {
            this.camera.keysUp.push(87); //W
            this.camera.keysLeft.push(65); //A
            this.camera.keysDown.push(83); //S
            this.camera.keysRight.push(68); //D
        },
        addHealth() {
            // let totalHealth = 100,
            //     health = 100,
            //     bar;
        },
        addSprint() {
            let interval,
                totalStamina = 30,
                stamina = 30;

            window.addEventListener('keydown', (event) => {
                if (event.key === 'Shift') {
                    clearInterval(interval);
                    interval = setInterval(() => {
                        if (stamina > 0) {
                            this.camera.speed = 3;
                            stamina -= 1;
                            this.updateStaminaAmount(stamina, totalStamina);
                        } else {
                            this.camera.speed = 2;
                        }
                    }, 100);
                }
            });

            window.addEventListener('keyup', (event) => {
                if (event.key === 'Shift') {
                    this.camera.speed = 2;
                    clearInterval(interval);
                    interval = setInterval(() => {
                        if (stamina < totalStamina) {
                            stamina += 1;
                            this.updateStaminaAmount(stamina, totalStamina);
                        }
                    }, 100);
                }
            });
        },
        addLean() {
            window.addEventListener('keydown', (event) => {
                if (event.key === 'e') {
                    this.camera.rotation.z = -0.2;
                }
            });

            window.addEventListener('keyup', (event) => {
                if (event.key === 'e') {
                    this.camera.rotation.z = 0;
                }
            });

            window.addEventListener('keydown', (event) => {
                if (event.key === 'q') {
                    this.camera.rotation.z = 0.2;
                }
            });

            window.addEventListener('keyup', (event) => {
                if (event.key === 'q') {
                    this.camera.rotation.z = 0;
                }
            });
        },
        addAmmo() {
            let totalAmmo = 100,
                ammo = 10;

            this.updateAmmoAmount(ammo, totalAmmo);

            window.addEventListener('pointerdown', (event) => {
                if (event.button === 0) {
                    if (ammo > 0) {
                        ammo -= 1;
                    }

                    this.updateAmmoAmount(ammo, totalAmmo);
                }
            })

            window.addEventListener('keydown', (event) => {
                if (event.key === 'r') {
                    if (ammo < 10 && totalAmmo > 0) {
                        totalAmmo -= (10 - ammo);
                        ammo = 10;
                    }

                    this.updateAmmoAmount(ammo, totalAmmo);
                }
            });
        },
    },
    beforeUnmount() {
        window.removeEventListener('keydown', () => {
        });
        window.removeEventListener('keyup', () => {
        });
        window.removeEventListener('pointerdown', () => {
        });
    },
}