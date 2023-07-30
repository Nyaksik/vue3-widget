import './custom-components'

import '../style/index.css'

async function test() {
  return 'test'
}

test().then((res) => console.log(res))
