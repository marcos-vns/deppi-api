import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { RegisterData } from "../model/Auth";
import { RegisterStudentDto } from "@/model/RegisterStudentDto";
import { RegisterCivilServantDto } from "@/model/RegisterCivilServantDto";

export class AuthService {

  async registerStudent(student: RegisterStudentDto) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: student.email
      }
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(student.password, 10);

    const user = await prisma.user.create({
      data: {
        name: student.name,
        email: student.email,
        passwordHash,
        personalPhones: student.personalPhones,
        cpf: student.cpf,
        registrationName: student.registrationName,
        dateOfBirth: new Date(student.dateOfBirth),
        maritalStatus: student.maritalStatus,
        placeOfBirth: student.placeOfBirth,
        sex: student.sex,
        bloodType: student.bloodType,
        rhFactor: student.rhFactor,
        numberOfDependents: student.numberOfDependents,
        raceEthnicity: student.raceEthnicity,
        fatherName: student.fatherName,
        motherName: student.motherName,
        pisPasep: student.pisPasep,
        academicTitle: student.academicTitle,
        educationLevel: student.educationLevel,
        address: student.address,
        identityNumber: student.identityNumber,
        issuingAgency: student.issuingAgency,
        issuingState: student.issuingState,
        issueDate: new Date(student.issueDate),
        voterRegistrationNumber: student.voterRegistrationNumber,
        electoralZone: student.electoralZone,
        electoralSection: student.electoralSection,
        voterRegistrationState: student.voterRegistrationState,

        student: {
          create: {
            socialName: student.socialName,
            occupation: student.occupation,
            perCapitaIncome: student.perCapitaIncome
          }
        },

        roles: {
          create: {
            role: {
              connect: {
                slug: "ALUNO"
              }
            }
          }
        }
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  async registerCivilServant(civilServant: RegisterCivilServantDto, role: string) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: civilServant.email
      }
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const campusAlreadyExists = await prisma.campus.findUnique({
      where: {
        id: civilServant.campusId,
      },
    });

    if (!campusAlreadyExists) {
      throw new Error("Campus inexistente");
    }

    const passwordHash = await bcrypt.hash(civilServant.password, 10);

    const user = await prisma.user.create({
      data: {
        name: civilServant.name,
        email: civilServant.email,
        passwordHash,
        personalPhones: civilServant.personalPhones,
        cpf: civilServant.cpf,
        registrationName: civilServant.registrationName,
        dateOfBirth: new Date(civilServant.dateOfBirth),
        maritalStatus: civilServant.maritalStatus,
        placeOfBirth: civilServant.placeOfBirth,
        sex: civilServant.sex,
        bloodType: civilServant.bloodType,
        rhFactor: civilServant.rhFactor,
        numberOfDependents: civilServant.numberOfDependents,
        raceEthnicity: civilServant.raceEthnicity,
        fatherName: civilServant.fatherName,
        motherName: civilServant.motherName,
        pisPasep: civilServant.pisPasep,
        academicTitle: civilServant.academicTitle,
        educationLevel: civilServant.educationLevel,
        address: civilServant.address,
        identityNumber: civilServant.identityNumber,
        issuingAgency: civilServant.issuingAgency,
        issuingState: civilServant.issuingState,
        issueDate: new Date(civilServant.issueDate),
        voterRegistrationNumber: civilServant.voterRegistrationNumber,
        electoralZone: civilServant.electoralZone,
        electoralSection: civilServant.electoralSection,
        voterRegistrationState: civilServant.voterRegistrationState,

        civilServant: {
          create: {
            campusId: civilServant.campusId,
            registration: civilServant.registration,
            preferredName: civilServant.preferredName,
            institutionalEmail: civilServant.institutionalEmail,
            siapeEmail: civilServant.siapeEmail,
            passwordRecoveryEmail: civilServant.passwordRecoveryEmail,
            notificationEmail: civilServant.notificationEmail,
            googleClassroomEmail: civilServant.googleClassroomEmail,
            institutionalPhones: civilServant.institutionalPhones,
            isInPGD: civilServant.isInPGD,
            suapDepartment: civilServant.suapDepartment,
            siapeAssignmentLocation: civilServant.siapeAssignmentLocation,
            siapeExerciseLocation: civilServant.siapeExerciseLocation,
            employmentStatus: civilServant.employmentStatus,
            workRegime: civilServant.workRegime,
            workSchedule: civilServant.workSchedule,
            operatesXRayEquipment: civilServant.operatesXRayEquipment,
            publicServiceStartDate: civilServant.publicServiceStartDate
              ? new Date(civilServant.publicServiceStartDate)
              : undefined,
            institutionAppointmentDate: civilServant.institutionAppointmentDate
              ? new Date(civilServant.institutionAppointmentDate)
              : undefined,
            institutionExerciseStartDate: civilServant.institutionExerciseStartDate
              ? new Date(civilServant.institutionExerciseStartDate)
              : undefined,
            positionAppointmentDate: civilServant.positionAppointmentDate
              ? new Date(civilServant.positionAppointmentDate)
              : undefined,
            positionExerciseStartDate: civilServant.positionExerciseStartDate
              ? new Date(civilServant.positionExerciseStartDate)
              : undefined,
            position: civilServant.position,
            positionClass: civilServant.positionClass,
            standard: civilServant.standard,
            positionGroup: civilServant.positionGroup,
            vacancyCode: civilServant.vacancyCode,
            bank: civilServant.bank,
            bankBranch: civilServant.bankBranch,
            checkingAccount: civilServant.checkingAccount,
          }
        },

        roles: {
          create: {
            role: {
              connect: {
                slug: role
              }
            }
          }
        }
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  async login(email: string, password: string) {

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign(
      {
        sub: user.id
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d"
      }
    );

    return token;
  }

}