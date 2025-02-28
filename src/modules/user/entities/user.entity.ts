import * as bcrypt from 'bcrypt';
import { DefaultEntity } from 'src/utils/entities/default.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity('users')
export class User extends DefaultEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
