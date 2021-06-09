var poseWalk0 = {
  lThigh: Math.PI / 6,
  rThigh: -Math.PI / 6
}
var poseWalk1 = {
  lThigh: -Math.PI / 6,
  rThigh: +Math.PI / 6
}
var keysWalk = [
  [0, poseWalk0],
  [0.5, poseWalk1],
  [1, poseWalk0]
];
var TWalk = 2;
//////////////////////////////////////////////////
// stand pose
var poseStand0 = { // stand
  lThigh: 0,
  rThigh: 0
}
var poseStand1 = { // stand
  lThigh: 0,
  rThigh: 0
}
var keysStand = [
  [0, poseStand0],
  [0.5, poseStand0],
  [1, poseStand1],
];
var TStand = 0.5; // any small amount
///////////////////////////////////////////////////
// stand-to-walk
var poseS2W0 = { // stand
  lThigh: 0,
  rThigh: 0
}
var poseS2W0 = poseStand1; // end of stand
var poseS2W1 = {
  lThigh: -Math.PI / 6,
  rThigh: 0 // right leg stays still
}
var poseS2W2 = poseWalk0; // beginning of walk
var keysS2W = [
  [0, poseS2W0],
  [0.5, poseS2W1],
  [1, poseS2W2],
];
var TS2W = TWalk;
////////////////////////////
//// walk-to-stand //////////
var poseW2S0 = poseWalk1;
var poseW2S1 = poseStand1;
var poseW2S2 = poseStand1; // beginning of walk
var keysW2S = [
  [0, poseW2S0],
  [0.5, poseW2S1],
  [1, poseW2S2],
];
var TW2S = TStand;
///////////////////////////////

function keyframeStand(t, T) { // periodic
  var keys = keysStand;
  var s = ((t - ts) % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lThigh * (1 - a) + keys[ii + 1][1].lThigh * a,
    keys[ii][1].rThigh * (1 - a) + keys[ii + 1][1].rThigh * a
  ];
  return intKey;
}

function keyframeW2S(t, T) { // periodic
	//state = 'Stand';
  if (t - ts > T) { // end of stand
    //console.log('switch to walk');
    ts = t; // reset ts to start of walk
    state = 'Stand';
    // end of S2W: return last frame
    return [poseW2S2.lThigh, poseW2S2.rThigh];
  }
  
  let keys = keysW2S;
  var s = ((t - ts) % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lThigh * (1 - a) + keys[ii + 1][1].lThigh * a,
    keys[ii][1].rThigh * (1 - a) + keys[ii + 1][1].rThigh * a
  ];
  return intKey;
}

function keyframeS2W(t, T) {
  if (t - ts > T) { // end of stand
    //console.log('switch to walk');
    ts = t; // reset ts to start of walk
    state = 'Walk';
    // end of S2W: return last frame
    return [poseS2W2.lThigh, poseS2W2.rThigh];
  }

  // non-periodic stand-to-walk animation
  let keys = keysS2W;
  var s = ((t - ts)%T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lThigh * (1 - a) + keys[ii + 1][1].lThigh * a,
    keys[ii][1].rThigh * (1 - a) + keys[ii + 1][1].rThigh * a
  ];
  return intKey;
}

function keyframeWalk(t, T) { // walk; periodic
  let keys = keysWalk;
  var s = ((t - ts) % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  // take i-1
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  intKey = [keys[ii][1].lThigh * (1 - a) + keys[ii + 1][1].lThigh * a,
    keys[ii][1].rThigh * (1 - a) + keys[ii + 1][1].rThigh * a
  ];
  return intKey;
}