### Default vs Named Exports in React

Example named export and call from another module

```
export class Person {}
```

```
import { Person } from './person'; 
```

Example default export and call from another module

```
export default class Person {}
```

```
import Person from './person'; 
```

#### Mixed Exports

```
export class Place {}

export default class Person {}
```

```
import Person, { Place } from './person';
```