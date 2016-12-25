export class Patient {

  $key?: string;
  name: string;
  birth: number;
  gender: string;

  constructor(name: string, birth: number) {
    this.name = name;
    this.birth = birth;
  }
}
