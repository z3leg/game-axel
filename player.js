class Player {
    constructor() {
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.pos = createVector(width/2, height/2);
        this.projectiles = [];
        this.klass = "circle";
        this.isAlive = true;
        this.shootInterval = 60;
        this.projectileAngle = 0;
        this.side = 30;
        this.shooting = false;

        this.weapon = playerWeaponsArr[playerCurrWeapon]; //returns hash
        
        this.health = playerHealth;
        this.shootingSpeed = this.weapon.shootingSpeed;
        this.damage = this.weapon.damage;
        


        this.kills = 0;
        this.xp = 0;
        this.nextLvlXp = 10;
        this.lvl = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }
    shoot() {
        push();
        rotate(this.projectileAngle);

        this.drawPos = createVector(width/2, height/2 );

        if (this.shootInterval - this.shootingSpeed <= 0) {

            if (this.weapon.projectileAmount > 1) {
                this.shootingAngle = this.projectileAngle - this.weapon.projectileAmount / 20
            } else {
                this.shootingAngle = this.projectileAngle
            }

            for (this.i = 0; this.i < this.weapon.projectileAmount; this.i++) {
                if (this.weapon.accuracy < 100) { //Applying accuracy logic
                    this.randomAngle = (100 / this.weapon.accuracy) / 100; 
                } else {
                    this.randomAngle = 0; 
                }
                this.projectiles.push(new Projectile(this.drawPos, //Position
                                                     this.shootingAngle + (this.i / 10) + random(-this.randomAngle, this.randomAngle), //Shooting angle
                                                     this.weapon)); //Weapon type
                this.shootInterval = 60;
            }
        }
        pop();
    }
    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isAlive = false;
            this.vel.mult(0);
        }
    }

    healthBar() {
        push();
        fill(0, 255, 0, 255);

        rect(width/2 - (this.health/2) /2, //X
            height/2 + this.side/2 + 5, //Y
            (this.health) /2, 5);  //Width & Height

        pop();
    }

    update() {
        if (this.isAlive) {
            
            if (this.xp >= this.nextLvlXp) {
                this.lvl++
                this.nextLvlXp *= 2;
            }

            this.shootInterval--;

            this.vel.add(this.acc);
            this.vel.limit(playerMvmSpeedLimit);
            this.acc.mult(0);
            this.draw(this.projectileAngle);
            this.healthBar();
        }
    }

    draw(angle) {
        textSize(30);
        fill(255);
        text("kills: " + this.kills, 10, 25);
        text("xp: " + this.xp, 10, 60);
        text("lvl: " + this.lvl, 10, 100);
        push();
        this.angle = angle;
        translate(width/2, height/2)
        rotate(angle);
        ellipse(0, 0, this.side, this.side);
        rect(0, -5, 20, 10);
        pop();
    }

    
}