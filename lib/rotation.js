import { Model, System } from 'revelryengine/ecs/lib/ecs.js';

export class RotationModel extends Model {
    static components = {
        transform: { type: 'transform' },
        rotation:  { type: 'rotation'  },
    }
}

export class RotationSystem extends System {
    static models = {
        rotations: { model: RotationModel, isSet: true },
    }

    update() {
        for(const model of this.rotations) {
            model.transform.rotateEuler([0, model.rotation, 0]);
        }
    }
}