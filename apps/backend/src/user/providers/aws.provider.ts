import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SNS } from 'aws-sdk';

@Injectable()
export class AWSProvider {
  constructor(private configservice: ConfigService) { }
  public async publishSmsMessage(phone: string, otp: string): Promise<void> {
    const sns = new SNS({
      apiVersion: '2010-03-31',
      region: 'ap-south-1',
      endpoint: 'https://sns.ap-south-1.amazonaws.com',
      accessKeyId: this.configservice.get('aws.accessKeyId'),
      secretAccessKey: this.configservice.get('aws.secretAccessKey')
    });

    const params = {
      Message: `${otp} is your One Time Password for Labourize. Do not share with anyone.`,
      PhoneNumber: `+91${phone}`,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          'DataType': 'String',
          'StringValue': 'Labourize'
        }
      }
    };
    const res = await sns.publish(params).promise();
    console.log(res);
  }
}
