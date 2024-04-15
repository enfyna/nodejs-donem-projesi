// backup.service.ts

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OgrenciService } from './ogrenci/ogrenci.service';
import * as fs from 'fs';
import * as path from 'path';
import * as nodemailer from 'nodemailer';

@Injectable()
export class BackupService {
    constructor(private readonly ogrenciService: OgrenciService) { }

    @Cron('6 21 * * 1')
    async handleBackup() {
        try {
            // Öğrenci listesini al
            const students = await this.ogrenciService.findAllOgrenci();

            if (!students || students.length === 0) {
                throw new Error('No students found for backup.');
            }

            // Öğrenci listesini JSON formatına dönüştür
            const jsonData = JSON.stringify(students, null, 2);

            // Yedek dosyasını oluştur
            const backupDir = path.join(__dirname, '..', 'backups');
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir);
            }
            const backupFilePath = path.join(backupDir, 'students_backup.json');
            fs.writeFileSync(backupFilePath, jsonData, 'utf-8');

            // E-posta gönder
            await this.sendBackupEmail(backupFilePath);
        } catch (error) {
            console.error('Error during backup:', error);
        }
    }

    private async sendBackupEmail(backupFilePath: string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'testdenememaili11@gmail.com',
            to: 'testdenememaili11@gmail.com',
            subject: 'Weekly Backup',
            text: 'Attached is the weekly backup of students.',
            attachments: [
                {
                    filename: 'students_backup.json',
                    path: backupFilePath,
                },
            ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }

}
