export class Vector2 {
    x;
    y;
    constructor(_x:number, _y:number){
        this.x = _x;
        this.y = _y;
    }
  
    Length () {
        return Math.sqrt(this.SqrLength());
    }
    SqrLength () {
    return this.x * this.x + this.y * this.y;
    }
    Equals (_vec0:Vector2, _vec1:Vector2) {
        return _vec0.x == _vec1.x && _vec0.y == _vec1.y;
    }
    Add (_vec:Vector2) {
        this.x += _vec.x;
        this.y += _vec.y;
    }
    Sub (_vec:Vector2) {
        this.x -= _vec.x;
        this.y -= _vec.y;
    }
    Div (_f:number) {
        this.x /= _f;
        this.y /= _f;
    }
    Mul (_f:number) {
        this.x *= _f;
        this.y *= _f;
    }
    Normalize () {
        var sqrLen = this.SqrLength();
        if (sqrLen != 0) {
            var factor = 1.0 / Math.sqrt(sqrLen);
            this.x *= factor;
            this.y *= factor;
        }
    }
    Normalized () {
        var sqrLen = this.SqrLength();
        if (sqrLen != 0) {
            var factor = 1.0 / Math.sqrt(sqrLen);
            return new Vector2(this.x * factor, this.y * factor);
        }
        return new Vector2(0, 0);
    }
    Lerp(_vec0:Vector2, _vec1:Vector2, _t:number) {
        return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
    }
    SqrDistance(_vec0: Vector2, _vec1: Vector2) {
        var x = _vec0.x - _vec1.x;
        var y = _vec0.y - _vec1.y;
        return (x * x + y * y);
    }
    Distance(_vec0:Vector2, _vec1:Vector2) {
        return Math.sqrt(this.SqrDistance(_vec0, _vec1));
    }
    Scale(_vec0:Vector2, _vec1:Vector2) {
        return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
    }
    Min(_vec0:Vector2, _vec1:Vector2) {
        return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
    }
    Max(_vec0:Vector2, _vec1:Vector2) {
        return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
    }
   static  Sub(_vec0: Vector2, _vec1: Vector2) {
        return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y);
    }
}
