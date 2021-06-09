class Obstacle {
	constructor (center,size) {
		this.center = center.clone();
    var meshset = new THREE.MeshPhongMaterial();
		this.mesh = new THREE.Mesh (new THREE.CylinderGeometry(size,size,20,20), meshset);
		this.mesh.position.copy (center);
    this.mesh.position.y += 10;
		this.size = size;
    scene.add (this.mesh)
	}
}