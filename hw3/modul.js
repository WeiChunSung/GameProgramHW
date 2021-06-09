function buildSteve() {
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  texture = loader.load ('https://i.imgur.com/IejOuMK.png');

  head = buildHead();
  torso = buildTorso();
  torso.add (head);
  head.position.y = h1;
  scene.add (torso);
  torso.position.set (0, h1, 0);
  
  lArm = buildLArm();
  torso.add (lArm);
  lArm.position.set (w+w/2, h1, 0);
  rArm = buildRArm();
  torso.add (rArm);
  rArm.position.set ((w+w/2) * -1, h1, 0)
  

  lLeg = buildLLeg();
  torso.add (lLeg);
  lLeg.position.set (w/2, 0, 0);
  rLeg = buildRLeg();
  torso.add (rLeg);
  rLeg.position.set ((w/2) * -1, 0, 0);
}

function buildHead() {
  var geometry = createMesh(0, 12.4,12.4,12.4);
  let head = new THREE.Group();
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  head.add (mesh);
  mesh.position.y = w;
  return head;
}

function buildLArm() {
  var geometry = createMesh(2, 6.2,19.1,6.2);
  let lArm = new THREE.Group();
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  lArm.add (mesh);
  mesh.position.y = -h1/2;
  return lArm;
}
function buildRArm() {
  var geometry = createMesh(2, 6.2,19.1,6.2);
  let rArm = new THREE.Group();
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  rArm.add (mesh);
  mesh.position.y = -h1/2;
  return rArm;
}

function buildLLeg() {
  var geometry = createMesh(3, 6.2,19.1,6.2);
  let lLeg = new THREE.Group();
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  lLeg.add (mesh);
  mesh.position.y = -h1/2;
  return lLeg;
}
function buildRLeg() {
  var geometry = createMesh(3, 6.2,19.1,6.2);
  let rLeg = new THREE.Group();
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  rLeg.add (mesh);
  mesh.position.y = -h1/2;
  return rLeg;
}

function buildTorso() {
  var geometry = createMesh(1, 12.4, 19.1, 6.2);
  let torso = new THREE.Group();
  let mesh = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, side:THREE.DoubleSide}));
  torso.add (mesh);
  mesh.position.y = h1/2;

	return torso;
}

function createMesh(part, WW, HH, DD) {
  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  var a, b, c, d, e, f, g, h, i, j, k, l, m, x;
  
  switch (part) {
  case 0:
  	a = {u: 2*ww, v: hh+5*ww};
    b = {u: 4*ww, v: hh+5*ww};
    c = {u: 6*ww, v: hh+5*ww};
    d = {u: 0, v: hh+3*ww};
    e = {u: 2*ww, v: hh+3*ww};
    f = {u: 4*ww, v: hh+3*ww};
    g = {u: 6*ww, v: hh+3*ww};
    h = {u: 8*ww, v: hh+3*ww};
    i = {u: 0, v: hh+ww};
    j = {u: 2*ww, v: hh+ww};
    k = {u: 4*ww, v: hh+ww};
    l = {u: 6*ww, v: hh+ww};
    m = {u: 8*ww, v: hh+ww};
    break;
  case 1:
  	a = {u: 5*ww, v:hh+ww};
    b = {u: 7*ww, v:hh+ww};
    c = {u: 9*ww, v:hh+ww};
    d = {u: 4*ww, v:hh};
    e = {u: 5*ww, v:hh};
    f = {u: 7*ww, v:hh};
    g = {u: 8*ww, v:hh};
    h = {u: 10*ww, v:hh};
    i = {u: 4*ww, v:0};
    j = {u: 5*ww, v:0};
    k = {u: 7*ww, v:0};
    l = {u: 8*ww, v:0};
    m = {u: 10*ww, v:0};
    x = {u: 9*ww, v: hh};
    break;
  case 2:
  	a = {u: 11*ww, v:hh+ww};
    b = {u: 12*ww, v:hh+ww};
    c = {u: 13*ww, v:hh+ww};
    d = {u: 10*ww, v:hh};
    e = {u: 11*ww, v:hh};
    f = {u: 12*ww, v:hh};
    g = {u: 13*ww, v:hh};
    h = {u: 14*ww, v:hh};
    i = {u: 10*ww, v:0};
    j = {u: 11*ww, v:0};
    k = {u: 12*ww, v:0};
    l = {u: 13*ww, v:0};
    m = {u: 14*ww, v:0};
    break;
  case 3:
  	a = {u: 1*ww, v:hh+ww};
    b = {u: 2*ww, v:hh+ww};
    c = {u: 3*ww, v:hh+ww};
    d = {u: 0*ww, v:hh};
    e = {u: 1*ww, v:hh};
    f = {u: 2*ww, v:hh};
    g = {u: 3*ww, v:hh};
    h = {u: 4*ww, v:hh};
    i = {u: 0*ww, v:0};
    j = {u: 1*ww, v:0};
    k = {u: 2*ww, v:0};
    l = {u: 3*ww, v:0};
    m = {u: 4*ww, v:0};
    break;
  }
  
  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
  
  // PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 ); // 4,0,1,5
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
  
  // NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
  
  // NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e
  
  // NY
  vertices.push(-WW/2,-HH/2,DD/2, -WW/2,-HH/2,-DD/2, WW/2,-HH/2,-DD/2, WW/2,-HH/2,DD/2 ); // 3,7,6,2
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	if(part == 1) uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, x.u/UU,x.v/VV, c.u/UU,c.v/VV); // b,f,x,c
  else uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c
  
  geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  
  return geometry;
  
}