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

interface HeirloomBetaEmailProps {
  testflightUrl: string
}

export const HeirloomBetaEmail = ({ testflightUrl }: HeirloomBetaEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Heirloom Beta - Preserve Your Family Recipes</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Heirloom Beta</Heading>

          <Text style={text}>Hi there,</Text>

          <Text style={text}>
            You're in! Welcome to the Heirloom beta program.
          </Text>

          <Text style={text}>
            Heirloom transforms your family recipes into beautiful, personalized cards
            that preserve the warmth and stories behind each dish. No more plain text
            ingredients—your recipes become keepsakes with vintage aesthetics, custom
            stickers, and handwritten notes.
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
            <strong>4.</strong> Open Heirloom and import your first recipe<br />
            <strong>5.</strong> Customize with stickers and vintage styles
          </Text>

          <Heading style={h2}>What to Expect</Heading>

          <Text style={text}>
            • <strong>Vintage card design:</strong> Beautiful aesthetics with coffee stains and worn edges<br />
            • <strong>50+ custom stickers:</strong> Hearts, stars, food icons, and occasion markers<br />
            • <strong>Smart shopping lists:</strong> Sync ingredients to iOS Reminders<br />
            • <strong>Universal import:</strong> Works with 500+ recipe sites<br />
            • <strong>Dinner party planner:</strong> Timeline multiple recipes for perfect timing<br />
            • <strong>iCloud sync:</strong> Your recipes available on all your devices
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

export default HeirloomBetaEmail

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
  backgroundColor: 'var(--color-heirloom-coral)',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
}

const link = {
  color: 'var(--color-heirloom-coral)',
  textDecoration: 'underline',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0 0',
}
