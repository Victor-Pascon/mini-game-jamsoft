export class Input {
    constructor() {
        this._keys = {};
        this._justPressed = {};
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this._setupListeners();
    }

    _setupListeners() {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    }

    _onKeyDown(e) {
        if (!this._keys[e.code]) {
            this._justPressed[e.code] = true;
        }
        this._keys[e.code] = true;
    }

    _onKeyUp(e) {
        this._keys[e.code] = false;
    }

    isDown(code) {
        return this._keys[code] === true;
    }

    isJustPressed(code) {
        if (this._justPressed[code]) {
            this._justPressed[code] = false;
            return true;
        }
        return false;
    }

    getDirection() {
        let dx = 0;
        let dy = 0;

        if (this.isDown('ArrowUp') || this.isDown('KeyW')) dy -= 1;
        if (this.isDown('ArrowDown') || this.isDown('KeyS')) dy += 1;
        if (this.isDown('ArrowLeft') || this.isDown('KeyA')) dx -= 1;
        if (this.isDown('ArrowRight') || this.isDown('KeyD')) dx += 1;

        if (dx !== 0 && dy !== 0) {
            const len = Math.sqrt(dx * dx + dy * dy);
            dx /= len;
            dy /= len;
        }

        return { x: dx, y: dy };
    }

    destroy() {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
    }
}