class Agent {
  constructor(pos, mesh) {
    this.pos = pos.clone();
    this.vel = new THREE.Vector3();
    this.force = new THREE.Vector3();
    this.target = null;
    this.size = 3;
    this.mesh = mesh;
    scene.add (mesh);
    
    this.nbhd = [];
    this.MAXSPEED = 5;
    this.ARRIVAL_R = 30;
    
    // for orientable agent
    this.angle = 0;
  }
  
  update(dt) {
    this.accumulateForce();
    this.vel.add(this.force.clone().multiplyScalar(dt));

		// ARRIVAL: velocity modulation
    if (this.target) {
      let diff = this.target.clone().sub(this.pos)
      let dst = diff.length();
      if (dst < this.ARRIVAL_R) {
        this.vel.setLength(dst)
      }
    }

		
    // MAXSPEED modulation
		let speed = this.vel.length()
		this.vel.setLength(Math.clamp (speed, 0, this.MAXSPEED))
		this.pos.add(this.vel.clone().multiplyScalar(dt))
    this.mesh.position.copy(this.pos)
    
    // for orientable agent
    if (this.vel.length() > 1) {
	    	this.angle = Math.atan2 (this.vel.y, this.vel.x)
    		this.mesh.rotation.z = this.angle;
   	}
  }
  setTarget(x,y,z) {
    if (this.target)
    	this.target.set(x,y,z);
    else
    	this.target = new THREE.Vector3(x,y,z);
  }
  targetInducedForce(targetPos, mode=0) { // seek
    let speed;
    if (mode === 0)
    	speed = this.MAXSPEED;
    else if (mode === 1)
    	speed = this.vel.length();
    	
    return targetPos.clone().sub(this.pos).normalize().multiplyScalar(speed).sub(this.vel)
  }
  
  addNbr(otherAgent) {
    this.nbhd.push(otherAgent)
  }

  accumulateForce() {
		this.force.set (0,0,0);
    if (this.target)
			this.force.copy(this.targetInducedForce(this.target));
		
    // path related (for simple straight line)
    let pS = new THREE.Vector3(-50, 0, 0);
    let pE = new THREE.Vector3(0, 30, 0);
    if (this.pos.x >= -50 && this.pos.x < 0) {
    	pS = new THREE.Vector3(-50, 0, 0);
			pE = new THREE.Vector3(0, 10, 0);
      //this.force.add(this.targetInducedForce(this.target, 1));
    } else if (this.pos.x > 0 && this.pos.x < 25) {
    	pS = new THREE.Vector3(0, 10, 0);
			pE = new THREE.Vector3(25, -10, 0);    
    } else if (this.pos.x > 25 && this.pos.x < 50){
    	//console.log(3);
      pS = new THREE.Vector3(25, -10, 0);
			pE = new THREE.Vector3(50, 0, 0);
    }
    
    let pHot = pE.clone().sub(pS).normalize();
    
    let posF = this.pos.clone().add (this.vel);
    
    let tmp = posF.clone().sub(pS);
    let proj = pHot.multiplyScalar(tmp.dot(pHot)).add(pS);
    
    let distance = posF.distanceTo(proj);
    let isOut = posF.clone().sub(pS);
    if(distance > radius) {
    	let correction = this.targetInducedForce(proj, 1);
      this.force.add (correction);
    }
    
    // separation
    let push = new THREE.Vector3()
    for (let i = 0; i < this.nbhd.length; i++) {
      let point = this.pos.clone().sub(this.nbhd[i].pos);
      push.add(point.setLength(20 / point.length()))
      push.y *= 0;
    }
    this.force.add(push)
	}	

}