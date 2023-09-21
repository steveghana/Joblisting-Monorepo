/* === Modules === */
import { ApplicationsModule } from '../applications/applications.module';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule } from '../clients/clients.module';
import { ClockedHoursModule } from '../clocked-hours/clocked-hours.module';
import { DevelopersModule } from '../developers/developers.module';
import { InterviewsModule } from '../interviews/interviews.module';
import { RolesModule } from '../roles/roles.module';
/* ==== All Entities are located in Config/model.js */
export const Modules = [
  AuthModule,
  ClientsModule,
  ClockedHoursModule,
  DevelopersModule,
  InterviewsModule,
  ApplicationsModule,
  RolesModule,
];
