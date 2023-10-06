import { html, css, LitElement } from 'lit';

import { Game  } from 'revelryengine/ecs/lib/game.js';
import { Stage } from 'revelryengine/ecs/lib/stage.js';
import { quat  } from 'revelryengine/renderer/deps/gl-matrix.js';

import { GameObjectMeta, GameObjectSystem } from 'revelryengine/core/lib/game-object.js';
import { Transform,      TransformSystem  } from 'revelryengine/core/lib/transform.js';
import { MeshAsset,      MeshSystem       } from 'revelryengine/core/lib/mesh.js';
import { SpriteAsset,    SpriteSystem     } from 'revelryengine/core/lib/sprite.js';
import { RendererSystem                   } from 'revelryengine/core/lib/renderer.js';

import 'revelryengine/renderer/lib/render-paths/preview/preview-path.js';

import { RotationSystem } from './rotation.js'

export class MainStage extends Stage {
    id = 'main';

    constructor(){
        super();

        this.initializers['meta']      = (c) => new GameObjectMeta(c.value);
        this.initializers['transform'] = (c) => new Transform(c.value);
        this.initializers['mesh']      = (c) => new MeshAsset(c);
        this.initializers['sprite']    = (c) => new SpriteAsset(c);

        this.systems.add(new TransformSystem());
        this.systems.add(new GameObjectSystem());
        this.systems.add(new MeshSystem());
        this.systems.add(new SpriteSystem());
        this.systems.add(new RendererSystem());
        this.systems.add(new RotationSystem());

        this.createRenderer();
        this.createCamera();
        this.createSprite();
    }

    createRenderer() {
        this.createEntity({ 
            worldRender: {
                autoResize:  true,
            },
        });
    }

    createCamera() {
        this.createEntity({
            transform: { translation: [0, 50, 0], rotation: quat.fromEuler(quat.create(), -90, 0, 0) },
            camera:    { 
                renderPath: 'preview',
                type: 'orthographic', 
                orthographic: { yfov: 45 * (Math.PI / 180), xmag: 15, ymag: 15, znear: 0.1, zfar: 100 },
            },
        });
    }

    createSprite() {
        this.createEntity({
            transform: { translation: [-10, 0, 0], rotation: quat.fromEuler(quat.create(), -90, 0, 0) },
            sprite:    { 
                path: import.meta.resolve('../assets/kenney_alien-ufo-pack/shipGreen_manned.png'),
            },
            rotation: -2,
        });

        this.createEntity({
            transform: { translation: [-5, 0, 0], rotation: quat.fromEuler(quat.create(), -90, 0, 0) },
            sprite:    { 
                path: import.meta.resolve('../assets/kenney_alien-ufo-pack/shipPink_manned.png'),
            },
            rotation: -1,
        });

        this.createEntity({
            transform: { translation: [0, 0, 0], rotation: quat.fromEuler(quat.create(), -90, 0, 0) },
            sprite:    { 
                path: import.meta.resolve('../assets/kenney_alien-ufo-pack/shipYellow_manned.png'),
            },
        });

        this.createEntity({
            transform: { translation: [5, 0, 0], rotation: quat.fromEuler(quat.create(), -90, 0, 0) },
            sprite:    { 
                path: import.meta.resolve('../assets/kenney_alien-ufo-pack/shipBlue_manned.png'),
            },
            rotation: 2,
        });

        this.createEntity({
            transform: { translation: [10, 0, 0], rotation: quat.fromEuler(quat.create(), -90, 0, 0) },
            sprite:    { 
                path: import.meta.resolve('../assets/kenney_alien-ufo-pack/shipBeige_manned.png'),
            },
            rotation: 2,
        });
    }
}

class UFOGame extends Game {
    constructor() {
        super();
        this.stages.add(new MainStage());
    }
}

export class UFOGameElement extends LitElement {

    static properties = {
        game: { type: Object },
    }

    static styles = css`
        :host {
            width: 100%;
            height: 100%;
            display: block;
            color: white;
        }

        canvas {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    `

    connectedCallback() {
        super.connectedCallback();

        this.game = new UFOGame();
        this.game.start();
    }

    render() {
        return html`
            ${this.game.getContext('main:renderer').renderer.canvas}
        `;
    }
}

customElements.define('game-ufo', UFOGameElement);