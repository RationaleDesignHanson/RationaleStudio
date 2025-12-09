import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface ZeroBetaEmailProps {
  testflightUrl: string
}

export const ZeroBetaEmail = ({ testflightUrl }: ZeroBetaEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Zero Beta - Your AI Email Assistant Awaits</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Zero Beta</Heading>

          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            You're in! Welcome to the Zero beta program.
          </Text>

          <Text style={text}>
            Zero uses Claude AI to automatically extract actions from your Gmail inbox
            and present them as swipeable cards. No more digging through emails to find
            what needs your attention.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={testflightUrl}>
              Download on TestFlight
            </Button>
          </Section>

          <Heading style={h2}>Getting Started</Heading>

          <Text style={text}>
            <strong>1.</strong> Install TestFlight app (if you don't have it)<br />
            <strong>2.</strong> Click the link above<br />
            <strong>3.</strong> Accept the beta invitation<br />
            <strong>4.</strong> Open Zero and connect your Gmail account<br />
            <strong>5.</strong> Watch as Zero analyzes your emails
          </Text>

          <Heading style={h2}>What to Expect</Heading>

          <Text style={text}>
            • <strong>AI-powered classification:</strong> 43 intent categories<br />
            • <strong>Automatic action extraction:</strong> Bills, packages, RSVPs, forms<br />
            • <strong>Swipeable card interface:</strong> Tinder for your inbox<br />
            • <strong>Device integrations:</strong> Calendar, Contacts, Wallet<br />
            • <strong>Privacy-first:</strong> Read-only access, no email storage
          </Text>

          <Heading style={h2}>Need Help?</Heading>

          <Text style={text}>
            Reply to this email or reach out at <a href="mailto:beta@rationale.work" style={link}>beta@rationale.work</a>
          </Text>

          <Text style={text}>
            We're excited to have you as an early tester!
          </Text>

          <Text style={footer}>
            Best,<br />
            Matt & the Rationale team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ZeroBetaEmail

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const h1 = {
  color: '#000',
  fontSize: '32px',
  fontWeight: '700',
  margin: '40px 0',
  padding: '0',
  lineHeight: '1.3',
}

const h2 = {
  color: '#000',
  fontSize: '20px',
  fontWeight: '600',
  margin: '32px 0 16px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#FFD700',
  borderRadius: '8px',
  color: '#000',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
}

const link = {
  color: '#FFD700',
  textDecoration: 'underline',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0 0',
}
