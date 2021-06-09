class Path {
	constructor(pS, pE, radius) {
  	this.pS = pS;
    this.pE = pE;
    this.radius = radius;
    this.start = new THREE.Mesh (new THREE.CircleGeometry (this.radius,20), new THREE.MeshBasicMaterial({color:'red', transparent:true, opacity:0.2}));
  	this.path = new THREE.Mesh (new THREE.PlaneGeometry(this.pS.clone().distanceTo(this.pE), this.radius * 2), new THREE.MeshBasicMaterial({color:'yellow', transparent:true, opacity:0.2}));
    this.end = this.start.clone();
    
    this.center = this.pS.clone().add(this.pE).multiplyScalar(0.5);// (pS+pE)/2
  	this.p = this.pE.clone().sub(this.pS); // pE-pS
  	this.angle = Math.atan2(this.p.y, this.p.x);
  }
  create() {
  	scene.add (this.path);
    this.end.position.copy (this.pE);
  	this.start.position.copy (this.pS);
    scene.add (this.start, this.end);
    this.path.position.copy (this.center);
    this.path.rotation.z = this.angle;
  }
}