import {MeshBuilder, Vector3} from "@babylonjs/core";

export default {
    methods: {
        drawHealthBar() {
            const healthBarOuter = document.createElement('div'),
                healthBarInner = document.createElement('div'),
                styleOuter = healthBarOuter.style,
                styleInner = healthBarInner.style;

            healthBarOuter.id = 'health_1';
            healthBarInner.id = 'health_2';

            styleOuter.position = 'absolute';
            styleOuter.top = '15px';
            styleOuter.left = '15px';
            styleOuter.width = '200px';
            styleOuter.height = '10px';
            styleOuter.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            styleOuter.padding = '2px';

            styleInner.width = '100%';
            styleInner.height = '100%';
            styleInner.backgroundColor = 'rgba(200, 0, 0, 0.5)';
            styleInner.transition = 'width 0.2s';

            if (!document.getElementById('health_1')) {
                document.body.appendChild(healthBarOuter);
            }
            if (!document.getElementById('health_2')) {
                healthBarOuter.appendChild(healthBarInner);
            }

            return healthBarInner;
        },
        drawStaminaBar() {
            const staminaBarOuter = document.createElement('div'),
                staminaBarInner = document.createElement('div'),
                styleOuter = staminaBarOuter.style,
                styleInner = staminaBarInner.style;

            staminaBarOuter.id = 'stamina_1';
            staminaBarInner.id = 'stamina_2';

            styleOuter.position = 'absolute';
            styleOuter.top = '32px';
            styleOuter.left = '15px';
            styleOuter.width = '200px';
            styleOuter.height = '10px';
            styleOuter.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            styleOuter.padding = '2px';

            styleInner.width = '100%';
            styleInner.height = '100%';
            styleInner.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            styleInner.transition = 'width 0.2s';

            if (!document.getElementById('stamina_1')) {
                document.body.appendChild(staminaBarOuter);
            }
            if (!document.getElementById('stamina_2')) {
                staminaBarOuter.appendChild(staminaBarInner);
            }
        },
        updateStaminaAmount(stamina, totalStamina) {
            const bar = document.getElementById('stamina_2');
            bar.style.width = `${(stamina / totalStamina) * 200}px`;
        },
        drawReticle() {
            const pointsHorizontalA = [
                    new Vector3(0.03, 0, 0),
                    new Vector3(0.01, 0, 0),
                ],
                pointsHorizontalB = [
                    new Vector3(-0.03, 0, 0),
                    new Vector3(-0.01, 0, 0),
                ],
                pointsVerticalA = [
                    new Vector3(0, -0.03, 0),
                    new Vector3(0, -0.01, 0),
                ],
                pointsVerticalB = [
                    new Vector3(0, 0.03, 0),
                    new Vector3(0, 0.01, 0),
                ],
                reticleXA = MeshBuilder.CreateLines('reticle_x_a', {points: pointsHorizontalA}, this.scene),
                reticleXB = MeshBuilder.CreateLines('reticle_x_b', {points: pointsHorizontalB}, this.scene),
                reticleYA = MeshBuilder.CreateLines('reticle_y_a', {points: pointsVerticalA}, this.scene),
                reticleYB = MeshBuilder.CreateLines('reticle_y_b', {points: pointsVerticalB}, this.scene);

            reticleXA.parent = this.camera;
            reticleXB.parent = this.camera;
            reticleYA.parent = this.camera;
            reticleYB.parent = this.camera;
            reticleXA.position.z = 2;
            reticleXB.position.z = 2;
            reticleYA.position.z = 2;
            reticleYB.position.z = 2;
        },
        drawAmmoCount() {
            const currentCanvasHeight = window.getComputedStyle(document.querySelector('canvas')).height.split('px')[0],
                ammoAmountContainer = document.createElement('div'),
                ammoAmountInMag = document.createElement('span'),
                divider = document.createElement('span'),
                ammoAmountTotal = document.createElement('span'),
                containerStyle = ammoAmountContainer.style;

            ammoAmountInMag.id = 'ammo_mag';
            ammoAmountInMag.innerHTML = '00';
            divider.id = 'ammo_divider';
            divider.innerHTML = '/';
            ammoAmountTotal.id = 'ammo_total';
            ammoAmountTotal.innerHTML = '100';

            containerStyle.id = 'ammo'
            containerStyle.position = 'absolute';
            containerStyle.top = `${currentCanvasHeight - 30}px`;
            containerStyle.left = '15px';
            containerStyle.fontSize = '30px';
            containerStyle.color = 'white';
            containerStyle.fontWeight = '700';
            containerStyle.fontFamily = 'Avenir, Helvetica, Arial, sans-serif';

            if (!document.getElementById('ammo_mag')) {
                ammoAmountContainer.appendChild(ammoAmountInMag);
            }
            if (!document.getElementById('ammo_divider')) {
                ammoAmountContainer.appendChild(divider);
            }
            if (!document.getElementById('ammo_total')) {
                ammoAmountContainer.appendChild(ammoAmountTotal);
            }
            if (!document.getElementById('ammo')) {
                document.body.appendChild(ammoAmountContainer);
            }
        },
        updateAmmoAmount(current, total) {
            const magAmmo = document.getElementById('ammo_mag'),
                totalAmmo = document.getElementById('ammo_total');

            magAmmo.innerHTML = current.toString();
            totalAmmo.innerHTML = total.toString();
        },
    },
}