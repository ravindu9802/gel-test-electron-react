const LaneContentsData = [];

const items = 15;
for (let i = 0; i < items; i += 1) {
  LaneContentsData.push({
    key: i,
    lane: i + 1,
    sample_conc: '-',
    dil_lvl: '-',
  });
}

export default LaneContentsData; // you must export it to use in another file.
