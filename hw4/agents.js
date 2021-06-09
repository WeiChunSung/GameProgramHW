class Agent {
  constructor(pos, mesh) {
    this.pos = pos.clone();
    this.vel = new THREE.Vector3();
    this.force = new THREE.Vector3();
    this.target = null;
    this.size = 3;  // half width
    this.mesh = mesh;
    scene.add (mesh);
    
    this.nbhd = [];
    this.MAXSPEED = 50;
    this.ARRIVAL_R = 30;
    
    // for orientable agent
    this.angle = 0;
  }
  update(dt) {
    this.accumulateForce();
    
    // collision
    // for all obstacles in the scene
    let obs = scene.obstacles;

    // pick the most threatening one
    let theOne = null;
    let dist = 1e10;
    let vhat = this.vel.clone().normalize();
    const REACH = 70
    const K = 5
    let perp;
    for (let i = 0; i < obs.length; i++) {
      let point = obs[i].center.clone().sub (this.pos) // c-p
      let proj  = point.dot(vhat);
      if (proj > 0 && proj < REACH) {
        perp = new THREE.Vector3();
        perp.subVectors (point, vhat.clone().setLength(proj));
        let overlap = obs[i].size + this.size - perp.length()
        if (overlap > 0 && proj < dist) {
            theOne = obs[i]
            dist = proj
            perp.setLength (K*overlap);
            perp.negate()
        }
      }
    }
    if (theOne)
       this.force.add (perp);
       
    this.vel.add(this.force.clone().multiplyScalar(dt));


    // ARRIVAL: velocity modulation
    if (this.target !== null) {
      let diff = this.target.clone().sub(this.pos)
      let dst = diff.length();
      if (dst < this.ARRIVAL_R) {
        this.vel.setLength(dst);
        //console.log(this.ARRIVAL_R);
        if (dst < 1) {
          this.vel.setLength(0);
        }
      }
		}    
    
    this.pos.add(this.vel.clone().multiplyScalar(dt))
    this.mesh.position.copy(this.pos)
    
    // for orientable agent
    // non PD version
    if (this.vel.length() > 1) {
	    	this.angle = Math.atan2 (-this.vel.z, this.vel.x)
    		this.mesh.rotation.y = this.angle
        /// console.log(this.vel.length());
   	}
  }

  setTarget(x,y,z) {
  	if (this.target)
	    this.target.set(x,y,z)
    else
    	this.target = new THREE.Vector3(x,y,z);
  }
  targetInducedForce(targetPos) { // seek
    return targetPos.clone().sub(this.pos).normalize().multiplyScalar(this.MAXSPEED).sub(this.vel)
  }
  
  distanceTo(otherAgent) {
    return this.pos.distanceTo(otherAgent.pos)
  }
  
  addNbr(otherAgent) {
    this.nbhd.push(otherAgent)
  }

  accumulateForce() {
    if (this.target !== null)
    	this.force.copy(this.targetInducedForce(this.target));
      
    ////////////////////////////////////////
    // group steer related
    // separation
    let push = new THREE.Vector3()
    for (let i = 0; i < this.nbhd.length; i++) {
      let point = this.pos.clone().sub(this.nbhd[i].pos);
      push.add(point.setLength(120 / point.length()))
      push.y *= 0;
    }
    if(!toggle)this.force.add(push)

		// coherence
    if (this.nbhd.length > 0) { // 如果this.nbhd有其他agents
      // 算出 nbhd的平均位置
      // 利用 targetInducedForce （來吸引 this 往平均位置靠近）	
      // 將此力加到 this.force
      var dist = new THREE.Vector3();
      for(let i = 0; i < this.nbhd.length; i++)
      	dist = dist.add(this.nbhd[i].pos);
      	//dist = dist + this.nbhd[i].pos;
      dist = dist.divideScalar(this.nbhd.length);
      if(toggle)this.force.add(this.targetInducedForce(dist));
      
      //console.log(dist);
      
    }
  }
}