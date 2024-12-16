import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SNS } from 'aws-sdk';
import { AWSProvider } from "../providers/aws.provider";
import { TwilioProvider } from "../providers/twilio.provider";

@Injectable()
export class OTPService {
  constructor(
    private configservice: ConfigService,
    private awsProvider: AWSProvider,
    private twilioProvider: TwilioProvider
    ) { }

  public async publishSmsMessage(phone: string, otp: string): Promise<void> {
    const provider = this.configservice.get('sms.provider');

    if (provider === 'aws') {
     await this.awsProvider.publishSmsMessage(phone, otp);
    }
    else if (provider === 'twilio') {
      await this.twilioProvider.publishSmsMessage(phone, otp);
    }
  }
}
