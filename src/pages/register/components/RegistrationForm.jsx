import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organization: '',
    userType: '',
    location: '',
    interests: []
  });

  const userTypeOptions = [
    { value: 'individual', label: 'Individual User' },
    { value: 'researcher', label: 'Researcher/Academic' },
    { value: 'business', label: 'Business Professional' },
    { value: 'educator', label: 'Educator' },
    { value: 'policy', label: 'Policy Maker' },
    { value: 'other', label: 'Other' }
  ];

  const locationOptions = [
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'houston', label: 'Houston, TX' },
    { value: 'miami', label: 'Miami, FL' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'denver', label: 'Denver, CO' }
  ];

  const interestOptions = [
    'Weather Forecasting',
    'Air Quality Monitoring',
    'Carbon Tracking',
    'Indoor Plant Management',
    'Greenhouse Gas Analysis',
    'Climate Data Research',
    'Sustainability Planning',
    'Environmental Health'
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password?.length >= 8;
    const hasUpperCase = /[A-Z]/?.test(password);
    const hasLowerCase = /[a-z]/?.test(password);
    const hasNumber = /\d/?.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/?.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      strength: [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar]?.filter(Boolean)?.length,
      requirements: {
        hasMinLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar
      }
    };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    let newErrors = { ...errors };

    if (field === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors?.email;
      }
    }

    if (field === 'password') {
      const validation = validatePassword(value);
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (!validation?.isValid) {
        newErrors.password = 'Password does not meet all requirements';
      } else {
        delete newErrors?.password;
      }
    }

    if (field === 'confirmPassword') {
      if (!value) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (value !== formData?.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors?.confirmPassword;
      }
    }

    if (field === 'userType' && !value) {
      newErrors.userType = 'Please select a user type';
    } else if (field === 'userType') {
      delete newErrors?.userType;
    }

    setErrors(newErrors);
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev?.interests?.includes(interest)
        ? prev?.interests?.filter(i => i !== interest)
        : [...prev?.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const newErrors = {};
    if (!formData?.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData?.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData?.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData?.password)?.isValid) newErrors.password = 'Password does not meet all requirements';

    if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData?.confirmPassword !== formData?.password) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData?.userType) newErrors.userType = 'Please select a user type';

    if (!agreedToTerms) newErrors.terms = 'You must agree to the Terms of Service';
    if (!agreedToPrivacy) newErrors.privacy = 'You must agree to the Privacy Policy';

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/environmental-dashboard');
    }, 2000);
  };

  const passwordValidation = validatePassword(formData?.password);
  const strengthPercentage = (passwordValidation?.strength / 5) * 100;
  const strengthColor =
    strengthPercentage <= 40 ? 'bg-error' :
    strengthPercentage <= 60 ? 'bg-warning' :
    strengthPercentage <= 80 ? 'bg-secondary': 'bg-success';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={touched?.email ? errors?.email : ''}
          required
        />

        <div className="space-y-2">
          <Input
            type="password"
            label="Password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={touched?.password ? errors?.password : ''}
            required
          />

          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password Strength</span>
                <span className={`font-medium ${
                  strengthPercentage <= 40 ? 'text-error' :
                  strengthPercentage <= 60 ? 'text-warning' :
                  strengthPercentage <= 80 ? 'text-secondary': 'text-success'
                }`}>
                  {strengthPercentage <= 40 ? 'Weak' :
                   strengthPercentage <= 60 ? 'Fair' :
                   strengthPercentage <= 80 ? 'Good': 'Strong'}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strengthColor}`}
                  style={{ width: `${strengthPercentage}%` }}
                />
              </div>

              <div className="space-y-1 text-xs">
                <div className={`flex items-center gap-2 ${passwordValidation?.requirements?.hasMinLength ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.requirements?.hasMinLength ? 'CheckCircle2' : 'Circle'} size={14} />
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation?.requirements?.hasUpperCase ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.requirements?.hasUpperCase ? 'CheckCircle2' : 'Circle'} size={14} />
                  <span>One uppercase letter</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation?.requirements?.hasLowerCase ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.requirements?.hasLowerCase ? 'CheckCircle2' : 'Circle'} size={14} />
                  <span>One lowercase letter</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation?.requirements?.hasNumber ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.requirements?.hasNumber ? 'CheckCircle2' : 'Circle'} size={14} />
                  <span>One number</span>
                </div>
                <div className={`flex items-center gap-2 ${passwordValidation?.requirements?.hasSpecialChar ? 'text-success' : 'text-muted-foreground'}`}>
                  <Icon name={passwordValidation?.requirements?.hasSpecialChar ? 'CheckCircle2' : 'Circle'} size={14} />
                  <span>One special character</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={touched?.confirmPassword ? errors?.confirmPassword : ''}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="text"
            label="First Name"
            placeholder="Your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          />

          <Input
            type="text"
            label="Last Name"
            placeholder="Your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          />
        </div>

        <Input
          type="text"
          label="Organization (Optional)"
          placeholder="Your company, institution, or organization"
          value={formData?.organization}
          onChange={(e) => handleInputChange('organization', e?.target?.value)}
        />

        <Select
          label="User Type"
          placeholder="Choose your user type"
          options={userTypeOptions}
          value={formData?.userType}
          onChange={(value) => handleInputChange('userType', value)}
          error={touched?.userType ? errors?.userType : ''}
          required
        />

        <Select
          label="Primary Location (Optional)"
          description="Your default monitoring location"
          placeholder="Select your location"
          options={locationOptions}
          value={formData?.location}
          onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
          searchable
          clearable
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Environmental Interests (Optional)
          </label>
          <p className="text-xs text-muted-foreground">
            Select areas you're most interested in monitoring
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interestOptions?.map((interest) => (
              <div
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                  formData?.interests?.includes(interest)
                    ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-150 ${
                  formData?.interests?.includes(interest)
                    ? 'bg-primary border-primary' :'border-border'
                }`}>
                  {formData?.interests?.includes(interest) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
                <span className="text-sm text-foreground">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e?.target?.checked);
              if (e?.target?.checked) {
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors?.terms;
                  return newErrors;
                });
              }
            }}
            error={errors?.terms}
            required
          />
          <label htmlFor="terms" className="text-sm text-foreground">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a>
          </label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy"
            checked={agreedToPrivacy}
            onChange={(e) => {
              setAgreedToPrivacy(e?.target?.checked);
              if (e?.target?.checked) {
                setErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors?.privacy;
                  return newErrors;
                });
              }
            }}
            error={errors?.privacy}
            required
          />
          <label htmlFor="privacy" className="text-sm text-foreground">
            I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin">
              <Icon name="Loader2" size={16} />
            </div>
            Creating Account...
          </>
        ) : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;