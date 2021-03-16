package com.study.appstore.models.impl;

import com.study.appstore.models.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
   
    @Autowired
    private JavaMailSender emailSender;

    public void sendRestorePassword(User user){
        StringBuilder sb = new StringBuilder();
        sb.append("Restore your password in the nex link: ");
        sb.append("http://localhost:4200/security/restore-password/");
        sb.append(user.getRestorePassword());
        this.sendSimpleMessage(user.getEmail(), user.getFullname(), sb.toString());
    }

    private void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("efoodtime.team@gmail.com");
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        emailSender.send(message);
    }
}
