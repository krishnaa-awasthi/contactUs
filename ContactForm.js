// components/ContactForm.js
import React, { useState } from 'react';
import {
  Container,
  FormSection,
  ContactInfo,
  Heading,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
  ContactItem,
  Icon,
  Text,
  SocialIcons,
  SocialIcon,
  StatusMessage
} from '../styles/ContactFormStyles';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    message: '',
    type: '',
    visible: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        message: 'All fields are required',
        type: 'error',
        visible: true
      });
      return;
    }
    
    try {
      // Send data to backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus({
          message: 'Message sent successfully!',
          type: 'success',
          visible: true
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus({
          message: data.message || 'Error sending message. Please try again.',
          type: 'error',
          visible: true
        });
      }
    } catch (error) {
      setStatus({
        message: 'Network error. Please try again later.',
        type: 'error',
        visible: true
      });
      console.error('Error:', error);
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setStatus(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  return (
    <Container>
      <FormSection>
        <Heading>Send a Message</Heading>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="What is this regarding?"
              value={formData.subject}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
            />
          </FormGroup>
          
          <Button type="submit">Send Message</Button>
          
          {status.visible && (
            <StatusMessage type={status.type}>
              {status.message}
            </StatusMessage>
          )}
        </Form>
      </FormSection>
      
      <ContactInfo>
        <Heading>Contact Information</Heading>
        
        <ContactItem>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Text>
            <p>Email</p>
            <p>krishnaawasthi0306@gmail.com</p>
          </Text>
        </ContactItem>
        
        <ContactItem>
          <Icon>
            <FaPhone />
          </Icon>
          <Text>
            <p>Phone</p>
            <p>+91 - 84709 50837</p>
          </Text>
        </ContactItem>
        
        <ContactItem>
          <Icon>
            <FaMapMarkerAlt />
          </Icon>
          <Text>
            <p>Location</p>
            <p>Kanpur, Uttar Pradesh, India</p>
          </Text>
        </ContactItem>
        
        <Heading>Connect with Me</Heading>
        <SocialIcons>
          <SocialIcon href="#" aria-label="GitHub">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">
            <FaInstagram />
          </SocialIcon>
        </SocialIcons>
      </ContactInfo>
    </Container>
  );
};

export default ContactForm;
