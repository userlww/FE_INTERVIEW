function* testGen3() {
  try {
    console.log(11111)
    yield 2;
  } catch(e) {
    console.log(e)
  }
}
