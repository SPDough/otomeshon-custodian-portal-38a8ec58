import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Box, Card, CardContent, TextField, Button, Typography,
  Divider, Alert, CircularProgress,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useIntl } from "react-intl";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const intl = useIntl();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setMessage(intl.formatMessage({ id: "auth.checkEmail" }));
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message || "Google sign-in failed");
    }
    if (result.redirected) return;
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8, minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <Card sx={{ width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" mb={1}>
            {isSignUp ? intl.formatMessage({ id: "auth.createAccount" }) : intl.formatMessage({ id: "auth.welcomeBack" })}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            {isSignUp ? intl.formatMessage({ id: "auth.getStarted" }) : intl.formatMessage({ id: "auth.signInTo" })}
          </Typography>

          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn} sx={{ mb: 2, py: 1.25 }}>
            {intl.formatMessage({ id: "auth.continueWithGoogle" })}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">{intl.formatMessage({ id: "auth.or" })}</Typography>
          </Divider>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

          <Box component="form" onSubmit={handleEmailAuth}>
            <TextField fullWidth label={intl.formatMessage({ id: "auth.email" })} type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} />
            <TextField fullWidth label={intl.formatMessage({ id: "auth.password" })} type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              inputProps={{ minLength: 6 }} sx={{ mb: 3 }} />
            <Button fullWidth type="submit" variant="contained" disabled={loading} sx={{ py: 1.25 }}>
              {loading ? <CircularProgress size={22} /> : isSignUp ? intl.formatMessage({ id: "auth.createAccountBtn" }) : intl.formatMessage({ id: "auth.signIn" })}
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
            {isSignUp ? intl.formatMessage({ id: "auth.alreadyHaveAccount" }) : intl.formatMessage({ id: "auth.dontHaveAccount" })}{" "}
            <Button size="small" onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}>
              {isSignUp ? intl.formatMessage({ id: "auth.signInLink" }) : intl.formatMessage({ id: "auth.signUp" })}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Auth;
